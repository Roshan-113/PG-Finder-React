export default function Careers() {
  const jobs = [
    { id: 1, title: 'Full Stack Developer', type: 'Full-time', typeColor: '#dbeafe', typeText: '#1d4ed8', location: 'Bangalore / Remote', experience: '2–4 years', salary: '8–15 LPA', description: 'We\'re looking for a talented full stack developer to help build and scale our platform. Experience with Java, Spring Boot, React, and MySQL required.', tags: ['Java', 'Spring Boot', 'React', 'MySQL'] },
    { id: 2, title: 'Product Designer', type: 'Full-time', typeColor: '#dcfce7', typeText: '#15803d', location: 'Bangalore / Remote', experience: '3–5 years', salary: '10–18 LPA', description: 'Join our design team to create beautiful, intuitive user experiences. Strong portfolio and experience with Figma required.', tags: ['UI/UX', 'Figma', 'User Research', 'Prototyping'] },
    { id: 3, title: 'Marketing Manager', type: 'Full-time', typeColor: '#f3e8ff', typeText: '#6d28d9', location: 'Bangalore', experience: '4–6 years', salary: '12–20 LPA', description: 'Lead our marketing efforts to grow our user base. Experience in digital marketing, SEO, and content strategy required.', tags: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'] },
    { id: 4, title: 'Customer Success Manager', type: 'Full-time', typeColor: '#ffedd5', typeText: '#c2410c', location: 'Bangalore / Remote', experience: '2–4 years', salary: '6–12 LPA', description: 'Help our users succeed by providing excellent support and building strong relationships. Great communication skills required.', tags: ['Customer Support', 'Communication', 'Problem Solving'] }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc', color: '#1e293b' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)', padding: '80px 24px 64px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ content: '', position: 'absolute', top: '-80px', left: '-80px', width: '320px', height: '320px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ content: '', position: 'absolute', bottom: '-100px', right: '-60px', width: '400px', height: '400px', background: 'rgba(147,197,253,0.08)', borderRadius: '50%' }}></div>
        <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '14px', letterSpacing: '-1px', position: 'relative', zIndex: 1 }}>Join Our Team</h1>
        <p style={{ fontSize: '18px', color: '#bfdbfe', maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>Help us revolutionize the PG accommodation industry and make a difference in people's lives</p>
      </div>

      {/* Stats */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px', display: 'flex', justifyContent: 'center', gap: '64px' }}>
        {[{ num: '50+', lbl: 'Team Members' }, { num: '4', lbl: 'Open Positions' }, { num: '4.8★', lbl: 'Glassdoor Rating' }, { num: '100%', lbl: 'Remote Friendly' }].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb' }}>{s.num}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Why Join Us */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Why Work With Us?</h2>
          <p style={{ fontSize: '16px', color: '#64748b' }}>We're building something special, and we want you to be part of it</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { icon: 'rocket', bg: '#dbeafe', color: '#2563eb', title: 'Fast Growth', desc: 'Join a rapidly growing startup with endless opportunities to advance your career' },
            { icon: 'users', bg: '#dcfce7', color: '#16a34a', title: 'Great Team', desc: 'Work with talented, passionate people who genuinely care about the mission' },
            { icon: 'laptop-code', bg: '#f3e8ff', color: '#7c3aed', title: 'Remote Friendly', desc: 'Flexible work arrangements and a healthy work-life balance for everyone' },
            { icon: 'chart-line', bg: '#ffedd5', color: '#ea580c', title: 'Career Growth', desc: 'Clear career paths, mentorship, and continuous learning opportunities' }
          ].map((perk, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s, transform 0.2s' }} onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '26px', background: perk.bg, color: perk.color }}>
                <i className={`fas fa-${perk.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{perk.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div style={{ background: '#f1f5f9', padding: '64px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Open Positions</h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>Find your perfect role and apply today</p>
          </div>

          {jobs.map(job => (
            <div key={job.id} style={{ background: 'white', borderRadius: '14px', padding: '28px 32px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{job.title}</h3>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: job.typeColor, color: job.typeText }}>{job.type}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', color: '#64748b', fontSize: '13px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fas fa-briefcase"></i> {job.experience}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fas fa-rupee-sign"></i> {job.salary}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>{job.description}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {job.tags.map((tag, i) => (
                    <span key={i} style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: '6px', fontSize: '12px', color: '#475569', fontWeight: 500 }}>{tag}</span>
                  ))}
                </div>
              </div>
              <button style={{ padding: '12px 28px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => window.location.href = '/contact'}>Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', padding: '72px 24px', textAlign: 'center', color: 'white' }}>
        <i className="fas fa-envelope" style={{ fontSize: '44px', marginBottom: '16px', opacity: 0.9 }}></i>
        <h2 style={{ fontSize: '34px', fontWeight: 800, marginBottom: '12px' }}>Don't See Your Role?</h2>
        <p style={{ fontSize: '17px', color: '#bfdbfe', marginBottom: '28px' }}>We're always looking for talented people. Send us your resume and let's talk!</p>
        <button style={{ padding: '16px 36px', background: 'white', color: '#2563eb', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }} onClick={() => window.location.href = '/contact'}>Get in Touch</button>
      </div>
    </div>
  );
}
