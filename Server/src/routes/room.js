const express = require('express');
const router = express.Router();
const { createRoom, getRoomsByPG, updateRoom, deleteRoom } = require('../controllers/roomController');

router.post('/', createRoom);
router.get('/pg/:pgId', getRoomsByPG);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
