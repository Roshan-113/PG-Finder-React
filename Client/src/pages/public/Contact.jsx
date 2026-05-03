import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    // Simulate sending
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setSuccess('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inp = (name) => ({
    width: '100%', padding: '0.75rem', border: `1px solid ${errors[name] ? '#dc2626' : '#d1d5db'}`,
    borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'
  });
  const lbl = { display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#111827' }}>Contact Us</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '1.125rem' }}>We'd love to hear from you</p>
        </div>

        {/* Success */}
        {success && (
          <div style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '1rem', background: '#d1fae5', border: '1px solid #10b981', borderRadius: '0.5rem', color: '#065f46' }}>
            <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>{success}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Form */}
          <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={lbl}>Your Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} style={inp('name')}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = errors.name ? '#dc2626' : '#d1d5db'} />
                {errors.name && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>
              <div>
                <label style={lbl}>Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} style={inp('email')}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = errors.email ? '#dc2626' : '#d1d5db'} />
                {errors.email && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>
              <div>
                <label style={lbl}>Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} style={inp('subject')}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = errors.subject ? '#dc2626' : '#d1d5db'} />
                {errors.subject && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.subject}</div>}
              </div>
              <div>
                <label style={lbl}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                  style={{ ...inp('message'), resize: 'vertical', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = errors.message ? '#dc2626' : '#d1d5db'}></textarea>
                {errors.message && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.message}</div>}
              </div>
              <button type="submit" disabled={sending}
                style={{ padding: '0.875rem', background: sending ? '#93c5fd' : '#2563eb', color: 'white', fontWeight: 600, border: 'none', borderRadius: '0.5rem', cursor: sending ? 'not-allowed' : 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}
                onMouseOver={e => { if (!sending) e.currentTarget.style.background = '#1d4ed8'; }}
                onMouseOut={e => { if (!sending) e.currentTarget.style.background = '#2563eb'; }}>
                <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Get in Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: 'envelope', bg: '#eff6ff', color: '#2563eb', title: 'Email', content: <a href="mailto:support@pgfinder.com" style={{ color: '#2563eb', textDecoration: 'none' }}>support@pgfinder.com</a> },
                  { icon: 'phone', bg: '#f0fdf4', color: '#10b981', title: 'Phone', content: <a href="tel:+919876543210" style={{ color: '#2563eb', textDecoration: 'none' }}>+91 98765 43210</a> },
                  { icon: 'map-marker-alt', bg: '#fef3c7', color: '#f59e0b', title: 'Address', content: <p style={{ margin: 0, color: '#6b7280' }}>Bangalore, India</p> },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fas fa-${item.icon}`} style={{ color: item.color, fontSize: '1.25rem' }}></i>
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontWeight: 600, color: '#111827' }}>{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '1rem', padding: '2rem', color: 'white' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 700 }}>Business Hours</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9375rem' }}>
                {[['Monday - Friday', '9:00 AM - 6:00 PM'], ['Saturday', '10:00 AM - 4:00 PM'], ['Sunday', 'Closed']].map(([day, hrs]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{day}</span><span>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
