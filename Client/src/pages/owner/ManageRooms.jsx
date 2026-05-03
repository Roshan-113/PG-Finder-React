import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pgAPI, roomAPI } from '../../services/api';

const DELETE_REASONS = [
  'Room is under renovation',
  'Room is permanently closed',
  'Tenant moved out - room vacant',
  'Room merged with another room',
  'Property sold / transferred',
  'Other reason',
];

export default function ManageRooms() {
  const navigate = useNavigate();
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  // Update availability modal
  const [updateModal, setUpdateModal] = useState(null); // { pg, newAvailable }
  // Delete modal
  const [deleteModal, setDeleteModal] = useState(null); // { roomId, roomNumber, reason }

  useEffect(() => {
    pgAPI.getMyPGs()
      .then(res => setPGs(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Update available rooms for a PG
  const openUpdate = (pg) => {
    setUpdateModal({ pg, newAvailable: pg.availableRooms || pg.available_rooms || 0 });
  };

  const saveAvailability = async () => {
    const { pg, newAvailable } = updateModal;
    const total = pg.totalRooms || pg.total_rooms || 0;
    const val = parseInt(newAvailable);
    if (isNaN(val) || val < 0 || val > total) {
      alert(`Available rooms must be between 0 and ${total}`);
      return;
    }
    try {
      await pgAPI.update(pg.id, { availableRooms: val });
      setPGs(prev => prev.map(p => p.id === pg.id ? { ...p, availableRooms: val, available_rooms: val } : p));
      alert('Availability updated successfully!');
      setUpdateModal(null);
    } catch (err) {
      alert(err.message || 'Failed to update');
    }
  };

  // Delete room with reason
  const openDelete = (roomId, roomNumber) => {
    setDeleteModal({ roomId, roomNumber, reason: DELETE_REASONS[0] });
  };

  const confirmDelete = async () => {
    if (!deleteModal.reason) { alert('Please select a reason'); return; }
    try {
      await roomAPI.delete(deleteModal.roomId);
      // Refresh PGs to update room counts
      const res = await pgAPI.getMyPGs();
      setPGs(res.data || []);
      alert(`Room ${deleteModal.roomNumber} removed. Reason: ${deleteModal.reason}`);
      setDeleteModal(null);
    } catch (err) {
      alert(err.message || 'Failed to delete room');
    }
  };

  const inp = { padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Manage Rooms & Availability</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>Update room availability for your properties</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
          Loading...
        </div>
      ) : pgs.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <i className="fas fa-home" style={{ fontSize: '4rem', color: '#d1d5db', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#374151' }}>No Properties Yet</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: '#6b7280' }}>Add your first property to start managing rooms</p>
          <button onClick={() => navigate('/owner/add-pg')}
            style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-plus"></i> Add Property
          </button>
        </div>
      ) : (
        <>
          {/* Properties Table - same as Java */}
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Your Properties</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <tr>
                    {['PG Name', 'Type', 'Total Rooms', 'Available', 'Occupied', 'Rent/Month', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pgs.map(pg => {
                    const total = pg.totalRooms || pg.total_rooms || 0;
                    const available = pg.availableRooms || pg.available_rooms || 0;
                    const occupied = total - available;
                    const rent = parseFloat(pg.rentPerMonth || pg.rent_per_month || 0);
                    const pgType = pg.pgType || pg.pg_type || '';
                    return (
                      <tr key={pg.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                        onMouseOut={e => e.currentTarget.style.background = 'white'}>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#111827' }}>{pg.name}</td>
                        <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                          {pgType === 'boys' ? 'Boys PG' : pgType === 'girls' ? 'Girls PG' : 'Co-living'}
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>{total}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: '#dcfce7', color: '#166534' }}>
                            {available}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>{occupied}</td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#111827', fontSize: '0.875rem' }}>
                          ₹{rent.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <button onClick={() => openUpdate(pg)}
                            style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                            <i className="fas fa-edit"></i> Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Individual Rooms per PG */}
          {pgs.map(pg => (
            <RoomSection key={pg.id} pg={pg} onDeleteRoom={openDelete} />
          ))}
        </>
      )}

      {/* Update Availability Modal */}
      {updateModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>Update Availability</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
              <strong>{updateModal.pg.name}</strong>
            </p>

            <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Total Rooms:</span>
                <strong>{updateModal.pg.totalRooms || updateModal.pg.total_rooms || 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Current Available:</span>
                <strong style={{ color: '#10b981' }}>{updateModal.pg.availableRooms || updateModal.pg.available_rooms || 0}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 500, color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                New Available Rooms (0 - {updateModal.pg.totalRooms || updateModal.pg.total_rooms || 0})
              </label>
              <input type="number" min="0" max={updateModal.pg.totalRooms || updateModal.pg.total_rooms || 0}
                value={updateModal.newAvailable}
                onChange={e => setUpdateModal(prev => ({ ...prev, newAvailable: e.target.value }))}
                style={{ ...inp, fontSize: '1.125rem', fontWeight: 600 }} />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={saveAvailability}
                style={{ flex: 1, padding: '0.875rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                Save Changes
              </button>
              <button onClick={() => setUpdateModal(null)}
                style={{ flex: 1, padding: '0.875rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Room Modal with Reason Dropdown */}
      {deleteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-trash" style={{ color: '#dc2626', fontSize: '1.125rem' }}></i>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Remove Room</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Room: <strong>{deleteModal.roomNumber}</strong></p>
              </div>
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '0.875rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#991b1b' }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
              This action cannot be undone. Please select a reason before removing.
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                Reason for Removal *
              </label>
              <select value={deleteModal.reason}
                onChange={e => setDeleteModal(prev => ({ ...prev, reason: e.target.value }))}
                style={{ ...inp, background: 'white' }}>
                {DELETE_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={confirmDelete}
                style={{ flex: 1, padding: '0.875rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <i className="fas fa-trash"></i> Remove Room
              </button>
              <button onClick={() => setDeleteModal(null)}
                style={{ flex: 1, padding: '0.875rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component: rooms for each PG
function RoomSection({ pg, onDeleteRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ roomNumber: '', roomType: 'single', capacity: 1, rent: '', deposit: '' });

  const loadRooms = async () => {
    if (open) { setOpen(false); return; }
    setLoading(true);
    try {
      const res = await roomAPI.getByPG(pg.id);
      setRooms(res.data || []);
      setOpen(true);
    } catch { setRooms([]); setOpen(true); }
    finally { setLoading(false); }
  };

  const addRoom = async (e) => {
    e.preventDefault();
    if (!form.roomNumber || !form.rent) { alert('Room number and rent are required'); return; }
    try {
      const res = await roomAPI.create({
        pgId: pg.id,
        roomNumber: form.roomNumber,
        roomType: form.roomType,
        capacity: parseInt(form.capacity) || 1,
        rent: parseFloat(form.rent),
        deposit: parseFloat(form.deposit || 0)
      });
      setRooms(prev => [...prev, res.data]);
      setShowAdd(false);
      setForm({ roomNumber: '', roomType: 'single', capacity: 1, rent: '', deposit: '' });
    } catch (err) { alert(err.message); }
  };

  const inp = { padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem', overflow: 'hidden' }}>
      {/* PG Header - clickable to expand */}
      <div onClick={loadRooms}
        style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: open ? '1px solid #e5e7eb' : 'none' }}
        onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
        onMouseOut={e => e.currentTarget.style.background = 'white'}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <i className="fas fa-home" style={{ color: '#2563eb' }}></i>
          <div>
            <div style={{ fontWeight: 700, color: '#111827' }}>{pg.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{pg.city} • {pg.totalRooms || 0} rooms total</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {loading && <i className="fas fa-spinner fa-spin" style={{ color: '#9ca3af' }}></i>}
          <i className={`fas fa-chevron-${open ? 'up' : 'down'}`} style={{ color: '#6b7280' }}></i>
        </div>
      </div>

      {open && (
        <div style={{ padding: '1.5rem' }}>
          {/* Add Room Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{rooms.length} room(s) configured</span>
            <button onClick={() => setShowAdd(!showAdd)}
              style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <i className="fas fa-plus"></i> Add Room
            </button>
          </div>

          {/* Add Room Form */}
          {showAdd && (
            <div style={{ background: '#f0f9ff', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1rem', border: '1px solid #bfdbfe' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontWeight: 700, color: '#1e40af', fontSize: '0.9375rem' }}>Add New Room</h4>
              <form onSubmit={addRoom}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Room Number *</label>
                    <input value={form.roomNumber} onChange={e => setForm(p => ({ ...p, roomNumber: e.target.value }))} placeholder="e.g., A-101" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Type</label>
                    <select value={form.roomType} onChange={e => setForm(p => ({ ...p, roomType: e.target.value }))} style={inp}>
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="triple">Triple</option>
                      <option value="dormitory">Dormitory</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Capacity</label>
                    <input type="number" min="1" value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))} style={inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Rent/Month *</label>
                    <input type="number" value={form.rent} onChange={e => setForm(p => ({ ...p, rent: e.target.value }))} placeholder="₹" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>Deposit</label>
                    <input type="number" value={form.deposit} onChange={e => setForm(p => ({ ...p, deposit: e.target.value }))} placeholder="₹" style={inp} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" style={{ padding: '0.5rem 1.25rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>Save Room</button>
                  <button type="button" onClick={() => setShowAdd(false)} style={{ padding: '0.5rem 1.25rem', background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Rooms Table */}
          {rooms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', background: '#f9fafb', borderRadius: '0.5rem' }}>
              <i className="fas fa-door-open" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>No rooms added yet. Click "Add Room" to get started.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f9fafb' }}>
                  <tr>
                    {['Room No.', 'Type', 'Capacity', 'Rent', 'Deposit', 'Status', 'Remove'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.8125rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '0.875rem 1rem', fontWeight: 700, color: '#111827' }}>{r.roomNumber}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151', textTransform: 'capitalize' }}>{r.roomType}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{r.capacity}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>₹{parseFloat(r.rent || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>₹{parseFloat(r.deposit || 0).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, background: r.isAvailable ? '#d1fae5' : '#fee2e2', color: r.isAvailable ? '#065f46' : '#991b1b' }}>
                          {r.isAvailable ? 'Available' : 'Occupied'}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <button onClick={() => onDeleteRoom(r.id, r.roomNumber)}
                          style={{ padding: '0.375rem 0.75rem', background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
