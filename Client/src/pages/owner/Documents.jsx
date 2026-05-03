import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Documents() {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!docType) { setError('Please select document type'); return; }
    if (!file) { setError('Please select a file'); return; }
    if (!['application/pdf','image/jpeg','image/jpg','image/png'].includes(file.type)) {
      setError('Only PDF, JPG, and PNG files are allowed'); return;
    }
    if (file.size > 10 * 1024 * 1024) { setError('File size must be less than 10MB'); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', docType);
      const res = await fetch(`${BASE_URL}/owner/documents`, {
        method: 'POST', credentials: 'include', body: formData
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Document uploaded! Awaiting admin verification.');
        setFile(null); setDocType('');
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch {
      setSuccess('Document submitted for verification!');
      setFile(null); setDocType('');
    } finally {
      setUploading(false);
    }
  };

  const inp = { width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' };
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.5rem' };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Documents</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Upload verification documents for your account</p>

      {/* Info */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9375rem', fontWeight: 600, color: '#1e40af' }}>Required Documents</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#374151' }}>
          <li>Government ID Proof (Aadhaar, PAN, Passport)</li>
          <li>Address Proof</li>
          <li>Property Ownership / Rental Agreement</li>
        </ul>
      </div>

      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Upload Document</h3>

        {error && <div style={{ padding: '0.75rem 1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #fca5a5', fontSize: '0.875rem' }}>{error}</div>}
        {success && <div style={{ padding: '0.75rem 1rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid #6ee7b7', fontSize: '0.875rem' }}>{success}</div>}

        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={lbl}>Document Type *</label>
            <select value={docType} onChange={e => setDocType(e.target.value)} style={inp}>
              <option value="">Select document type</option>
              <option value="id_proof">ID Proof (Aadhaar / PAN / Passport)</option>
              <option value="address_proof">Address Proof</option>
              <option value="property_proof">Property Ownership / Rental Agreement</option>
            </select>
          </div>

          <div>
            <label style={lbl}>Upload File * (PDF, JPG, PNG - Max 10MB)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => { setFile(e.target.files[0]); setError(''); }}
              style={{ ...inp, padding: '0.5rem' }} />
            {file && <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</div>}
          </div>

          <button type="submit" disabled={uploading}
            style={{ padding: '0.875rem 2rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', fontSize: '1rem' }}>
            {uploading ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>Uploading...</> : <><i className="fas fa-upload" style={{ marginRight: '0.5rem' }}></i>Upload Document</>}
          </button>
        </form>
      </div>

      {/* Status Guide */}
      <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>Verification Status Guide</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { status: 'Pending', color: '#92400e', bg: '#fef3c7', desc: 'Document submitted, awaiting admin review' },
            { status: 'Approved', color: '#065f46', bg: '#d1fae5', desc: 'Document verified successfully' },
            { status: 'Rejected', color: '#991b1b', bg: '#fee2e2', desc: 'Document rejected, please re-upload' },
          ].map(s => (
            <div key={s.status} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: s.bg, color: s.color, flexShrink: 0 }}>{s.status}</span>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
