import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const regChartRef = useRef(null);
  const revChartRef = useRef(null);
  const regChartInstance = useRef(null);
  const revChartInstance = useRef(null);

  useEffect(() => {
    adminAPI.getDashboard()
      .then(res => {
        setStats(res.stats || {});
        setRecentActivities(res.recentActivities || []);
      })
      .catch(err => { setError(err.message); setStats({}); })
      .finally(() => setLoading(false));
  }, []);

  // Load Chart.js and render charts after stats load
  useEffect(() => {
    if (loading || !stats) return;

    const doRender = () => renderCharts();

    if (window.Chart) {
      // Already loaded — render on next tick so canvas refs are mounted
      const t = setTimeout(doRender, 50);
      return () => clearTimeout(t);
    }

    // Not loaded yet — inject script
    let script = document.getElementById('chartjs-cdn');
    if (!script) {
      script = document.createElement('script');
      script.id = 'chartjs-cdn';
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      document.head.appendChild(script);
    }

    const onLoad = () => { setTimeout(doRender, 50); };
    script.addEventListener('load', onLoad);
    return () => script.removeEventListener('load', onLoad);
  }, [loading, stats]);

  const renderCharts = () => {
    if (!window.Chart) return;
    // Registration chart (bar)
    if (regChartRef.current) {
      if (regChartInstance.current) regChartInstance.current.destroy();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      regChartInstance.current = new window.Chart(regChartRef.current, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            { label: 'Tenants', data: [2,3,1,4,2,3,5,2,4,3,2,1], backgroundColor: 'rgba(59,130,246,0.8)', borderColor: 'rgba(59,130,246,1)', borderWidth: 2 },
            { label: 'Owners',  data: [1,1,2,1,2,1,2,1,1,2,1,1], backgroundColor: 'rgba(96,165,250,0.8)', borderColor: 'rgba(96,165,250,1)', borderWidth: 2 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
      });
    }
    // Revenue chart (line)
    if (revChartRef.current) {
      if (revChartInstance.current) revChartInstance.current.destroy();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      revChartInstance.current = new window.Chart(revChartRef.current, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{ label: 'Revenue (₹)', data: [25000,37500,12000,68000,37500,50000,80000,25000,68000,45000,30000,15000], borderColor: 'rgba(59,130,246,1)', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 3, fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: 'rgba(59,130,246,1)', pointBorderColor: '#fff', pointBorderWidth: 2 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, ticks: { callback: v => '₹' + v.toLocaleString('en-IN') } } } }
      });
    }
  };

  const s = stats || {};
  const statCards = [
    { value: loading ? '...' : (s.users?.total || 0).toLocaleString(), label: 'Total Users',       icon: 'users',          bg: '#eff6ff', color: '#2563eb' },
    { value: loading ? '...' : (s.pgs?.total || 0).toLocaleString(),   label: 'Total Listings',    icon: 'home',           bg: '#f0fdf4', color: '#10b981' },
    { value: loading ? '...' : (s.bookings?.total || 0).toLocaleString(), label: 'Total Bookings', icon: 'calendar-check', bg: '#fef3c7', color: '#f59e0b' },
    { value: loading ? '...' : `₹${Number((s.bookings?.revenue || 0)).toLocaleString('en-IN')}`, label: 'Total Revenue', icon: 'rupee-sign', bg: '#fce7f3', color: '#ec4899' },
    { value: loading ? '...' : (s.pgs?.pending || 0),                  label: 'Pending Approvals', icon: 'clock',          bg: '#ede9fe', color: '#8b5cf6' },
    { value: loading ? '...' : (s.bookings?.active || 0),              label: 'Pending Reports',   icon: 'flag',           bg: '#fef9c3', color: '#eab308' },
  ];

  const quickActions = [
    { label: 'Manage Users',  icon: 'users',      color: '#2563eb', path: '/admin/users' },
    { label: 'View Listings', icon: 'building',   color: '#10b981', path: '/admin/listings' },
    { label: 'Verify Owners', icon: 'shield-alt', color: '#8b5cf6', path: '/admin/approvals' },
    { label: 'Review Reports',icon: 'flag',       color: '#eab308', path: '/admin/reports' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>Admin Dashboard</h1>
      <p style={{ color: '#6b7280', margin: '0 0 2rem 0' }}>Welcome back! Here's your platform overview</p>

      {error && <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((sc, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.5rem', background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className={`fas fa-${sc.icon}`} style={{ fontSize: '1.5rem', color: sc.color }}></i>
              </div>
              <div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{sc.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{sc.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>User Registrations (Last 12 Months)</h2>
          <div style={{ position: 'relative', height: '280px' }}>
            <canvas ref={regChartRef}></canvas>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>Revenue Trend (Last 12 Months)</h2>
          <div style={{ position: 'relative', height: '280px' }}>
            <canvas ref={revChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6', marginBottom: '2rem', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Recent Activities</h2>
          <button onClick={() => navigate('/admin/settings')} style={{ fontSize: '0.875rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All</button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>Loading...</div>
          ) : recentActivities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              <i className="fas fa-history" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ margin: 0 }}>No recent activities</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  {['User', 'Action', 'Description', 'Time'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((a, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f9fafb' }}
                    onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#111827' }}>{a.user_name || 'System'}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ padding: '0.125rem 0.5rem', background: '#f3f4f6', color: '#374151', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 500 }}>{a.action_type}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>{a.action_description}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      {new Date(a.created_at || a.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => navigate(a.path)}
              style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6', textAlign: 'center', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}>
              <i className={`fas fa-${a.icon}`} style={{ fontSize: '1.875rem', color: a.color, marginBottom: '0.75rem', display: 'block' }}></i>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
