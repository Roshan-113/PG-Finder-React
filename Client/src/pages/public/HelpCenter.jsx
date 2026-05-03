import { useState } from 'react';

const faqs = [
  { q: 'How do I book a PG?', a: 'To book a PG, browse listings, select your preferred PG, click "Book Now", fill in your details, and complete the payment. You\'ll receive a confirmation email once the booking is successful.' },
  { q: 'What payment methods are accepted?', a: 'We accept credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and encrypted.' },
  { q: 'Can I cancel my booking?', a: 'Yes, you can cancel your booking from "My Bookings" page. Refund policy depends on the cancellation timing and PG owner\'s policy.' },
  { q: 'How do I contact the PG owner?', a: 'You can send inquiries through the "Send Inquiry" button on the PG details page. Messages will be available in your Messages section.' },
  { q: 'How does the roommate finder work?', a: 'Browse roommate profiles based on compatibility scores, lifestyle preferences, and budget. Click "Connect" to send a connection request and start chatting.' },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const filtered = faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#111827' }}>Help Center</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '1.125rem' }}>Find answers to your questions</p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
            <input type="text" placeholder="Search for help..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { icon: 'search', color: '#2563eb', bg: '#eff6ff', title: 'Finding PG', desc: 'How to search and book PG' },
            { icon: 'credit-card', color: '#10b981', bg: '#f0fdf4', title: 'Payments', desc: 'Payment methods and refunds' },
            { icon: 'user-shield', color: '#f59e0b', bg: '#fef3c7', title: 'Account & Safety', desc: 'Profile and security settings' },
          ].map((c, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '2rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <i className={`fas fa-${c.icon}`} style={{ color: c.color, fontSize: '1.5rem' }}></i>
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>{c.title}</h3>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((faq, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <button onClick={() => toggleFaq(i)} style={{ width: '100%', padding: '1rem', background: 'white', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`} style={{ color: '#6b7280' }}></i>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1rem 1rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', marginTop: '3rem', color: 'white' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.75rem', fontWeight: 700 }}>Still need help?</h2>
          <p style={{ margin: '0 0 2rem 0', fontSize: '1.125rem', opacity: 0.9 }}>Our support team is here to assist you</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="mailto:support@pgfinder.com" style={{ padding: '0.875rem 1.5rem', background: 'white', color: '#2563eb', fontWeight: 600, borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-envelope"></i> Email Support
            </a>
            <a href="tel:+919876543210" style={{ padding: '0.875rem 1.5rem', background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-phone"></i> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
