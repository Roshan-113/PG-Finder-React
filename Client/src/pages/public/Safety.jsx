export default function Safety() {
  const beforeBooking = [
    { icon: 'eye', bg: '#eff6ff', border: '#bfdbfe', iconBg: '#2563eb', title: 'Visit in Person', items: ['Always visit the PG before booking', 'Check the actual room, not just photos', 'Visit during different times of day', 'Inspect common areas and facilities'] },
    { icon: 'file-contract', bg: '#f0fdf4', border: '#bbf7d0', iconBg: '#16a34a', title: 'Verify Documents', items: ['Check owner\'s ID proof and property documents', 'Read the rental agreement carefully', 'Get everything in writing', 'Keep copies of all documents'] },
    { icon: 'map-marker-alt', bg: '#faf5ff', border: '#e9d5ff', iconBg: '#7c3aed', title: 'Check Location', items: ['Research the neighborhood safety', 'Check proximity to police station', 'Verify public transport availability', 'Look for well-lit streets and areas'] },
    { icon: 'lock', bg: '#fff7ed', border: '#fed7aa', iconBg: '#ea580c', title: 'Security Features', items: ['Check for CCTV cameras in common areas', 'Verify door locks and window security', 'Ask about security guard availability', 'Check fire safety equipment'] }
  ];

  const duringStay = [
    { icon: 'user-shield', bg: '#fee2e2', color: '#dc2626', title: 'Personal Safety', items: ['Keep your room locked at all times', 'Don\'t share keys with strangers', 'Be cautious with personal information', 'Trust your instincts'] },
    { icon: 'wallet', bg: '#dbeafe', color: '#2563eb', title: 'Financial Safety', items: ['Get receipts for all payments', 'Use digital payment methods', 'Keep valuables in a safe place', 'Don\'t lend money to strangers'] },
    { icon: 'phone-alt', bg: '#dcfce7', color: '#16a34a', title: 'Emergency Contacts', items: ['Save local police number', 'Keep emergency contacts handy', 'Share your location with family', 'Know nearest hospital location'] },
    { icon: 'fire-extinguisher', bg: '#f3e8ff', color: '#7c3aed', title: 'Fire Safety', items: ['Know fire exit locations', 'Don\'t overload electrical outlets', 'Keep fire extinguisher accessible', 'Report electrical issues immediately'] },
    { icon: 'utensils', bg: '#fef9c3', color: '#ca8a04', title: 'Food Safety', items: ['Check food hygiene standards', 'Store food properly', 'Report food quality issues', 'Keep kitchen area clean'] },
    { icon: 'users', bg: '#e0e7ff', color: '#4338ca', title: 'Roommate Safety', items: ['Set clear boundaries', 'Communicate openly', 'Respect each other\'s privacy', 'Report concerning behavior'] }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc', color: '#1e293b' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 60%, #ef4444 100%)', padding: '80px 24px 64px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ content: '', position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }}></div>
        <div style={{ content: '', position: 'absolute', bottom: '-80px', right: '-40px', width: '360px', height: '360px', background: 'rgba(252,165,165,0.08)', borderRadius: '50%' }}></div>
        <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '36px', position: 'relative', zIndex: 1 }}>
          <i className="fas fa-shield-alt"></i>
        </div>
        <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '14px', position: 'relative', zIndex: 1 }}>Safety Tips</h1>
        <p style={{ fontSize: '18px', color: '#fecaca', maxWidth: '540px', margin: '0 auto', position: 'relative', zIndex: 1 }}>Your safety is our priority. Follow these guidelines for a secure PG experience</p>
      </div>

      {/* Before Booking */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Before Booking a PG</h2>
          <p style={{ fontSize: '16px', color: '#64748b' }}>Essential checks to perform before making your decision</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {beforeBooking.map((item, i) => (
            <div key={i} style={{ borderRadius: '16px', padding: '32px', border: '1px solid', background: item.bg, borderColor: item.border }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px', background: item.iconBg, color: 'white' }}>
                <i className={`fas fa-${item.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>{item.title}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
                {item.items.map((text, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>
                    <i className="fas fa-check-circle" style={{ marginTop: '2px', flexShrink: 0, color: item.iconBg }}></i>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* During Stay */}
      <div style={{ background: '#f1f5f9', padding: '64px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>During Your Stay</h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>Best practices for staying safe in your PG</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {duringStay.map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px', background: item.bg, color: item.color }}>
                  <i className={`fas fa-${item.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>{item.title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px', padding: 0, margin: 0 }}>
                  {item.items.map((text, j) => (
                    <li key={j} style={{ fontSize: '13px', color: '#64748b', paddingLeft: '14px', position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ content: '•', position: 'absolute', left: 0, color: '#94a3b8' }}>•</span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Red Flags */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderLeft: '5px solid #dc2626', borderRadius: '16px', padding: '36px', display: 'flex', gap: '24px' }}>
          <div style={{ width: '52px', height: '52px', background: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', flexShrink: 0 }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Red Flags to Watch Out For</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              {['Owner refuses to show property documents', 'No written agreement or receipt provided', 'Pressure to pay advance without viewing the property', 'Poor security measures or no proper locks', 'Unrealistic promises or too-good-to-be-true deals', 'Negative reviews or complaints from current tenants'].map((flag, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#374151' }}>
                  <i className="fas fa-times-circle" style={{ color: '#dc2626', marginTop: '2px', flexShrink: 0 }}></i>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Numbers */}
      <div style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)', padding: '72px 24px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '34px', fontWeight: 800, marginBottom: '10px' }}>Emergency Contact Numbers</h2>
        <p style={{ fontSize: '17px', color: '#fecaca', marginBottom: '40px' }}>Save these numbers for emergencies</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '700px', margin: '0 auto 40px' }}>
          {[{ icon: 'phone-alt', title: 'Police', num: '100' }, { icon: 'ambulance', title: 'Ambulance', num: '108' }, { icon: 'fire-extinguisher', title: 'Fire', num: '101' }].map((em, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '28px 20px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
              <i className={`fas fa-${em.icon}`} style={{ fontSize: '32px', marginBottom: '10px' }}></i>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{em.title}</h3>
              <div style={{ fontSize: '36px', fontWeight: 800 }}>{em.num}</div>
            </div>
          ))}
        </div>
        <p style={{ marginBottom: '20px', color: '#fecaca' }}>Need help or want to report an issue?</p>
        <button style={{ padding: '16px 36px', background: 'white', color: '#dc2626', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }} onClick={() => window.location.href = '/contact'}>Contact Support</button>
      </div>
    </div>
  );
}
