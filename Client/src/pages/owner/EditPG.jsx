import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pgAPI } from '../../services/api';
import { useFormValidation, validationRules } from '../../hooks/useFormValidation';

export default function EditPG() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, validateForm, setValues, hasError } = useFormValidation({
    title: '', pgType: '', description: '', address: '', city: '', state: '', pincode: '',
    totalRooms: '', availableRooms: '', rentPerMonth: '', securityDeposit: ''
  });

  useEffect(() => {
    pgAPI.getById(id)
      .then(res => {
        const pg = res.data;
        if (pg) setValues({
          title: pg.name || '', pgType: pg.pgType || pg.pg_type || '',
          description: pg.description || '', address: pg.address || '',
          city: pg.city || '', state: pg.state || '', pincode: pg.pincode || '',
          totalRooms: String(pg.totalRooms || pg.total_rooms || ''),
          availableRooms: String(pg.availableRooms || pg.available_rooms || ''),
          rentPerMonth: String(pg.rent_per_month || pg.rentPerMonth || ''),
          securityDeposit: String(pg.security_deposit || pg.securityDeposit || '')
        });
      })
      .catch(() => {});
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm({
      title: validationRules.pgName,
      pgType: { required: true, label: 'PG Type' },
      description: validationRules.description,
      address: validationRules.address,
      city: validationRules.city,
      pincode: validationRules.pincode,
      totalRooms: { required: true, numeric: true, label: 'Total Rooms' },
      rentPerMonth: validationRules.rent
    });
    if (!isValid) return;
    setLoading(true);
    try {
      await pgAPI.update(id, {
        name: values.title, pgType: values.pgType, description: values.description,
        address: values.address, city: values.city, state: values.state || 'Unknown',
        pincode: values.pincode, totalRooms: parseInt(values.totalRooms),
        availableRooms: parseInt(values.availableRooms || values.totalRooms),
        rentPerMonth: parseFloat(values.rentPerMonth),
        securityDeposit: parseFloat(values.securityDeposit || 0)
      });
      alert('PG updated successfully!');
      navigate('/owner/listings');
    } catch (err) {
      alert(err.message || 'Failed to update PG');
    } finally { setLoading(false); }
  };

  const inp = (f) => ({ width: '100%', padding: '0.625rem', border: `1px solid ${hasError(f) ? '#dc2626' : '#d1d5db'}`, borderRadius: '0.375rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' });
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#374151' };
  const err = (f) => hasError(f) ? <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors[f]}</div> : null;

  return (
    <div>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Edit PG</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Update your PG listing details</p>
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div><label style={lbl}>PG Name *</label><input type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} style={inp('title')} />{err('title')}</div>
            <div><label style={lbl}>PG Type *</label>
              <select name="pgType" value={values.pgType} onChange={handleChange} onBlur={handleBlur} style={inp('pgType')}>
                <option value="">Select</option><option value="boys">Boys</option><option value="girls">Girls</option><option value="co-living">Co-living</option>
              </select>{err('pgType')}</div>
            <div style={{ gridColumn: '1/-1' }}><label style={lbl}>Description *</label><textarea name="description" rows="4" value={values.description} onChange={handleChange} onBlur={handleBlur} style={{ ...inp('description'), resize: 'vertical', fontFamily: 'inherit' }}></textarea>{err('description')}</div>
            <div><label style={lbl}>Address *</label><input type="text" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} style={inp('address')} />{err('address')}</div>
            <div><label style={lbl}>City *</label><input type="text" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} style={inp('city')} />{err('city')}</div>
            <div><label style={lbl}>State</label><input type="text" name="state" value={values.state} onChange={handleChange} style={inp('state')} /></div>
            <div><label style={lbl}>Pincode *</label><input type="text" name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} style={inp('pincode')} />{err('pincode')}</div>
            <div><label style={lbl}>Total Rooms *</label><input type="number" name="totalRooms" value={values.totalRooms} onChange={handleChange} onBlur={handleBlur} style={inp('totalRooms')} />{err('totalRooms')}</div>
            <div><label style={lbl}>Available Rooms</label><input type="number" name="availableRooms" value={values.availableRooms} onChange={handleChange} style={inp('availableRooms')} /></div>
            <div><label style={lbl}>Rent/Month *</label><input type="number" name="rentPerMonth" value={values.rentPerMonth} onChange={handleChange} onBlur={handleBlur} style={inp('rentPerMonth')} />{err('rentPerMonth')}</div>
            <div><label style={lbl}>Security Deposit</label><input type="number" name="securityDeposit" value={values.securityDeposit} onChange={handleChange} style={inp('securityDeposit')} /></div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', background: '#2563eb', color: 'white', fontWeight: 600, borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update PG'}
            </button>
            <button type="button" onClick={() => navigate('/owner/listings')} style={{ padding: '0.75rem 2rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}


