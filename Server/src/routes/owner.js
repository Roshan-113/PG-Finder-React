const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { OwnerDocument, PGPhoto, PG } = require('../models');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, JPG, and PNG files are allowed'));
    }
  }
});

// Middleware to check if user is owner
const isOwner = (req, res, next) => {
  if (!req.session.userId || req.session.userRole !== 'owner') {
    return res.status(403).json({ success: false, message: 'Owner access required' });
  }
  next();
};

// Upload document
router.post('/documents', isOwner, upload.single('document'), async (req, res) => {
  try {
    const { documentType } = req.body;
    
    if (!documentType) {
      return res.status(400).json({ success: false, message: 'Document type is required' });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File is required' });
    }

    // Upload to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'pg-finder/documents',
          resource_type: 'auto',
          format: req.file.mimetype === 'application/pdf' ? 'pdf' : undefined
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const result = await uploadPromise;

    // Save to database
    const document = await OwnerDocument.create({
      ownerId: req.session.userId,
      documentType,
      documentUrl: result.secure_url,
      verificationStatus: 'pending'
    });

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload document'
    });
  }
});

// Get owner's documents
router.get('/documents', isOwner, async (req, res) => {
  try {
    const documents = await OwnerDocument.findAll({
      where: { ownerId: req.session.userId },
      order: [['uploaded_at', 'DESC']]
    });

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch documents'
    });
  }
});

// Upload PG photos
router.post('/photos/:pgId', isOwner, upload.array('photos', 10), async (req, res) => {
  try {
    const { pgId } = req.params;
    
    // Verify PG belongs to owner
    const pg = await PG.findOne({
      where: { id: pgId, ownerId: req.session.userId }
    });

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found or access denied'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one photo is required'
      });
    }

    // Upload all photos to Cloudinary
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `pg-finder/pgs/${pgId}`,
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const results = await Promise.all(uploadPromises);

    // Save to database
    const photos = await Promise.all(
      results.map((result, index) =>
        PGPhoto.create({
          pgId,
          photoUrl: result.secure_url,
          photoType: 'other',
          displayOrder: index
        })
      )
    );

    res.json({
      success: true,
      message: 'Photos uploaded successfully',
      data: photos
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload photos'
    });
  }
});

// Get PG photos
router.get('/photos/:pgId', isOwner, async (req, res) => {
  try {
    const { pgId } = req.params;
    
    // Verify PG belongs to owner
    const pg = await PG.findOne({
      where: { id: pgId, ownerId: req.session.userId }
    });

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found or access denied'
      });
    }

    const photos = await PGPhoto.findAll({
      where: { pgId },
      order: [['displayOrder', 'ASC'], ['created_at', 'ASC']]
    });

    res.json({
      success: true,
      data: photos
    });
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch photos'
    });
  }
});

// Delete photo
router.delete('/photos/:photoId', isOwner, async (req, res) => {
  try {
    const { photoId } = req.params;
    
    const photo = await PGPhoto.findByPk(photoId, {
      include: [{ model: PG, as: 'pg' }]
    });

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    // Verify ownership
    if (photo.pg.ownerId !== req.session.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete from database
    await photo.destroy();

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete photo'
    });
  }
});

module.exports = router;
