import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';

const DEFAULT_SETTINGS = [
  { settingKey: 'site_name',       settingValue: 'PG Finder',              dataType: 'string',  description: 'Platform name' },
  { settingKey: 'commission_rate', settingValue: '10',                     dataType: 'number',  description: 'Commission % on bookings' },
  { settingKey: 'allow_reviews',   settingValue: 'true',                   dataType: 'boolean', description: 'Allow tenants to post reviews' },
  { settingKey: 'maintenance_mode',settingValue: 'false',                  dataType: 'boolean', description: 'Put site in maintenance mode' },
  { settingKey: 'support_email',   settingValue: 'support@pgfinder.com',   dataType: 'string',  description: 'Support email address' },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    Promise.all([
      adminAPI.getSettings().catch(() => ({ data: [] })),
      adminAPI.getDashboard().catch(() => ({ recentActivities: [] }))
    ]).then(([settingsRes, dashRes]) => {
      const fromDB = settingsRes.data || [];
      if (fromDB.length > 0) {
        // Merge DB values into defaults (DB wins)
        setSettings(DEFAULT_SETTINGS.map(def => {
          const found = fromDB.find(s => s.settingKey === def.settingKey);
          return found ? { ...def, settingValue: found.settingValue } : def;
        }));
      }
      setActivities(dashRes.recentActivities || []);
    }).finally(() => setLoading(false));
  }, []);

  const saveSetting = async (key, value) => {
    // Optimistic update
    setSettings(prev => prev.map(s => s.settingKey === key ? { ...s, settingValue: value } : s));
    try {
      await adminAPI.updateSetting(key, value);
      setToast(`"${key.replace(/_/g, ' ')}" saved`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Error: ' + err.message);
      setTimeout(() => setToast(''), 4000);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'cog' },
    { id: 'logs',    label: 'Activity Logs', icon: 'history' },
  ];

  return (
    <div>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.875rem', fontWeight: 700, color: '#111827' }}>Settings</h1>
      <p style={{ margin: '0 0 2rem 0', color: '#6b7280' }}>Manage platform configuration</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent', color: activeTab === tab.id ? '#2563eb' : '#6b7280', fontWeight: activeTab === tab.id ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '-1px' }}>
            <i className={'fas fa-' + tab.icon}></i> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {toast && (
            <div style={{ padding: '0.75rem 1rem', background: toast.startsWith('Error') ? '#fee2e2' : '#d1fae5', color: toast.startsWith('Error') ? '#991b1b' : '#065f46', borderRadius: '0.5rem', marginBottom: '1rem', border: `1px solid ${toast.startsWith('Error') ? '#fca5a5' : '#6ee7b7'}` }}>
              {toast}
            </div>
          )}
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Platform Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {settings.map(s => (
              <div key={s.settingKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{s.settingKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{s.description}</div>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                  {s.dataType === 'boolean' ? (
                    <button onClick={() => saveSetting(s.settingKey, s.settingValue === 'true' ? 'false' : 'true')}
                      style={{ width: '3rem', height: '1.5rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', background: s.settingValue === 'true' ? '#2563eb' : '#d1d5db', position: 'relative', transition: 'background 0.2s' }}>
                      <span style={{ position: 'absolute', top: '2px', left: s.settingValue === 'true' ? 'calc(100% - 22px)' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', display: 'block' }}></span>
                    </button>
                  ) : (
                    <input value={s.settingValue}
                      onChange={e => setSettings(prev => prev.map(x => x.settingKey === s.settingKey ? { ...x, settingValue: e.target.value } : x))}
                      onBlur={e => saveSetting(s.settingKey, e.target.value)}
                      style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', width: '160px' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Recent Activity Logs</h2>
          </div>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
          ) : activities.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>No activity logs found</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  {['Time', 'User', 'Action', 'Description'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', color: '#6b7280' }}>{new Date(a.created_at || a.createdAt).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#111827' }}>{a.user_name || 'System'}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ padding: '0.125rem 0.5rem', background: '#f3f4f6', color: '#374151', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 500 }}>{a.action_type}</span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>{a.action_description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
