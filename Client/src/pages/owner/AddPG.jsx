import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';
import { pgAPI } from '../../services/api';

export default function AddPG() {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState({ wifi: false, ac: false, food: false, laundry: false, parking: false, power_backup: false });
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    hasError
  } = useFormValidation({
    pgName: '',
    pgType: '',
    description: '',
    address: '',
    locality: '',
    city: '',
    pincode: '',
    totalRooms: '',
    singleRooms: '',
    doubleRooms: '',
    startingPrice: '',
    securityDeposit: '',
    maintenance: '',
    rules: ''
  });

  const toggleAmenity = (k) => setAmenities(p => ({ ...p, [k]: !p[k] }));

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) { alert('Maximum 5 photos allowed'); return; }
    for (let f of files) { if (f.size > 5242880) { alert('Each photo must be less than 5MB'); return; } }
    setPhotos(files);
    const readers = files.map(f => new Promise(res => { const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(f); }));
    Promise.all(readers).then(setPreviews);
  };

  const removePhoto = (i) => {
    setPhotos(p => p.filter((_, idx) => idx !== i));
    setPreviews(p => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm({
      pgName: validationRules.pgName,
      pgType: { required: true, label: 'PG Type' },
      description: validationRules.description,
      address: validationRules.address,
      locality: { required: true, minLength: 2, label: 'Locality' },
      city: validationRules.city,
      pincode: validationRules.pincode,
      totalRooms: {
        required: true,
        numeric: true,
        label: 'Total Rooms',
        custom: (value) => {
          const num = Number(value);
          if (num < 1) return 'Total rooms must be at least 1';
          if (num > 100) return 'Total rooms cannot exceed 100';
          return null;
        }
      },
      startingPrice: validationRules.rent
    });

    if (!isValid) return;

    setLoading(true);
    try {
      await pgAPI.create({
        name: values.pgName,
        pgType: values.pgType,
        description: values.description,
        address: `${values.address}, ${values.locality}`,
        city: values.city,
        state: values.state || 'Unknown',
        pincode: values.pincode,
        totalRooms: parseInt(values.totalRooms) || 0,
        availableRooms: parseInt(values.totalRooms) || 0,
        rentPerMonth: parseFloat(values.startingPrice) || 0,
        securityDeposit: parseFloat(values.securityDeposit) || 0,
        foodIncluded: amenities.food,
        wifiAvailable: amenities.wifi,
        acAvailable: amenities.ac,
        laundryAvailable: amenities.laundry,
        parkingAvailable: amenities.parking,
        amenities: Object.keys(amenities).filter(k => amenities[k]),
        images: previews
      });
      // Show success message then redirect
      setLoading(false);
      if (window.confirm('✅ PG submitted for admin approval!\n\nYour listing will appear to tenants only after admin approves it (usually within 24 hours).\n\nClick OK to view your listings.')) {
        navigate('/owner/listings');
      } else {
        navigate('/owner/listings');
      }
    } catch (err) {
      alert(err.message || 'Failed to create PG');
      setLoading(false);
    }
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '0.5rem 1rem',
    border: `1px solid ${errors[fieldName] && touched[fieldName] ? '#dc2626' : '#d1d5db'}`,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box'
  });

  const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };
  const sectionTitle = { fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1.5rem 0' };
  const errorStyle = { color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Add New PG</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>List your property on PG Finder</p>
      </div>

      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Basic Info */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={sectionTitle}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>PG Name *</label>
                <input type="text" name="pgName" value={values.pgName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter PG name" style={inputStyle('pgName')} />
                {hasError('pgName') && <div style={errorStyle}>{errors.pgName}</div>}
              </div>
              <div>
                <label style={labelStyle}>PG Type *</label>
                <select name="pgType" value={values.pgType} onChange={handleChange} onBlur={handleBlur} style={inputStyle('pgType')}>
                  <option value="">Select type</option>
                  <option value="boys">Boys PG</option>
                  <option value="girls">Girls PG</option>
                </select>
                {hasError('pgType') && <div style={errorStyle}>{errors.pgType}</div>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description *</label>
                <textarea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} rows="4" placeholder="Describe your PG" style={{ ...inputStyle('description'), resize: 'vertical', fontFamily: 'inherit' }}></textarea>
                {hasError('description') && <div style={errorStyle}>{errors.description}</div>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={sectionTitle}>Location Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Address *</label>
                <input type="text" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} placeholder="Street address" style={inputStyle('address')} />
                {hasError('address') && <div style={errorStyle}>{errors.address}</div>}
              </div>
              <div>
                <label style={labelStyle}>Area/Locality *</label>
                <input type="text" name="locality" value={values.locality} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., Koramangala" style={inputStyle('locality')} />
                {hasError('locality') && <div style={errorStyle}>{errors.locality}</div>}
              </div>
              <div>
                <label style={labelStyle}>City *</label>
                <input type="text" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., Bangalore" style={inputStyle('city')} />
                {hasError('city') && <div style={errorStyle}>{errors.city}</div>}
              </div>
              <div>
                <label style={labelStyle}>Pincode *</label>
                <input type="text" name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., 560034" style={inputStyle('pincode')} />
                {hasError('pincode') && <div style={errorStyle}>{errors.pincode}</div>}
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={sectionTitle}>Room Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Total Rooms *</label>
                <input type="number" name="totalRooms" value={values.totalRooms} onChange={handleChange} onBlur={handleBlur} placeholder="0" style={inputStyle('totalRooms')} />
                {hasError('totalRooms') && <div style={errorStyle}>{errors.totalRooms}</div>}
              </div>
              <div>
                <label style={labelStyle}>Single Rooms</label>
                <input type="number" name="singleRooms" value={values.singleRooms} onChange={handleChange} placeholder="0" style={inputStyle('singleRooms')} />
              </div>
              <div>
                <label style={labelStyle}>Double Rooms</label>
                <input type="number" name="doubleRooms" value={values.doubleRooms} onChange={handleChange} placeholder="0" style={inputStyle('doubleRooms')} />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={sectionTitle}>Pricing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Starting Price *</label>
                <input type="number" name="startingPrice" value={values.startingPrice} onChange={handleChange} onBlur={handleBlur} placeholder="₹ 0" style={inputStyle('startingPrice')} />
                {hasError('startingPrice') && <div style={errorStyle}>{errors.startingPrice}</div>}
              </div>
              <div>
                <label style={labelStyle}>Security Deposit</label>
                <input type="number" name="securityDeposit" value={values.securityDeposit} onChange={handleChange} placeholder="₹ 0" style={inputStyle('securityDeposit')} />
              </div>
              <div>
                <label style={labelStyle}>Maintenance Charges</label>
                <input type="number" name="maintenance" value={values.maintenance} onChange={handleChange} placeholder="₹ 0" style={inputStyle('maintenance')} />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={sectionTitle}>Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[['wifi', 'WiFi'], ['ac', 'AC'], ['food', 'Food'], ['laundry', 'Laundry'], ['parking', 'Parking'], ['power_backup', 'Power Backup']].map(([k, l]) => (
                <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={amenities[k]} onChange={() => toggleAmenity(k)} style={{ width: '1rem', height: '1rem', accentColor: '#2563eb' }} />
                  <span style={{ color: '#374151', fontSize: '0.875rem' }}>{l}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={sectionTitle}>Photos</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Upload Photos (Max 5 photos, 5MB each)</label>
              <input type="file" accept="image/*" multiple onChange={handlePhotos} style={inputStyle('photos')} />
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Supported formats: JPG, PNG, WEBP</p>
            </div>
            {previews.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                {previews.map((src, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={src} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '8rem', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #d1d5db' }} />
                    <button type="button" onClick={() => removePhoto(i)} style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '1.5rem', height: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                      <i className="fas fa-times"></i>
                    </button>
                    {i === 0 && <span style={{ position: 'absolute', bottom: '0.25rem', left: '0.25rem', background: '#2563eb', color: 'white', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>Primary</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: 600, color: 'white', background: '#3b82f6', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.8 : 1 }}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : 'Submit for Approval'}
            </button>
            <button type="button" onClick={() => navigate('/owner/listings')} style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #d1d5db', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
