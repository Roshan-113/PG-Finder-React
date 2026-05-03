import { useState } from 'react';

const faqs = [
  {
    section: 'Booking & Payments', icon: 'credit-card',
    items: [
      { q: 'How do I book a PG?', a: 'Browse listings, select your preferred PG, click "Book Now", fill in your details, and complete the payment.' },
      { q: 'What payment methods are accepted?', a: 'We accept credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and digital wallets via Razorpay.' },
      { q: 'Can I cancel my booking?', a: 'Yes, you can cancel from "My Bookings". Refund policy depends on cancellation timing.' },
      { q: 'How do I get a refund?', a: 'Refunds are processed within 5-7 business days after cancellation approval.' },
    ]
  },
  {
    section: 'Account & Profile', icon: 'user',
    items: [
      { q: 'How do I update my profile?', a: 'Go to My Profile from the navigation menu and update your details.' },
      { q: 'How do I change my password?', a: 'Go to Settings > Security > Change Password.' },
      { q: 'I forgot my password', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
      { q: 'How do I delete my account?', a: 'Contact our support team at support@pgfinder.com to request account deletion.' },
    ]
  },
  {
    section: 'PG Search & Listings', icon: 'search',
    items: [
      { q: 'How do I search for PGs?', a: 'Use the Search PG page with filters for location, price, room type, and gender.' },
      { q: 'How do I save a PG?', a: 'Click the heart icon on any PG listing to save it to your Saved PGs.' },
      { q: 'Are the PG listings verified?', a: 'Yes, all listings go through our verification process before being published.' },
      { q: 'Can I contact the owner directly?', a: 'Yes, use the "Send Inquiry" button on the PG details page to message the owner.' },
    ]
  },
];

export default function TenantHelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <i className="fas fa-question-circle" style={{ color: '#3b82f6', fontSize: '2.5rem' }}></i>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem 0' }}>How can we help you?</h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280', margin: 0 }}>Search for answers or browse our help topics</p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: '40rem', margin: '0 auto 3rem' }}>
        <div style={{ position: 'relative' }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.25rem' }}></i>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for help..."
            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid #d1d5db', borderRadius: '0.75rem', fontSize: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', outline: 'none', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'} />
        </div>
      </div>

      {/* Contact Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { icon: 'phone', title: 'Call Us', sub: 'Mon-Sat 9 AM - 6 PM', value: '+91 98765 43210' },
          { icon: 'envelope', title: 'Email Us', sub: 'We reply within 24 hours', value: 'support@pgfinder.com' },
          { icon: 'comment-dots', title: 'Live Chat', sub: 'Chat with our support team', value: 'Start Chat', isBtn: true },
        ].map((c, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center', transition: 'box-shadow 0.2s' }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <i className={`fas fa-${c.icon}`} style={{ color: '#3b82f6', fontSize: '1.75rem' }}></i>
            </div>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#111827', margin: '0 0 0.5rem 0' }}>{c.title}</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.75rem 0' }}>{c.sub}</p>
            {c.isBtn
              ? <button style={{ fontWeight: 600, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9375rem' }}>{c.value}</button>
              : <p style={{ fontWeight: 600, color: '#2563eb', margin: 0 }}>{c.value}</p>}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 2rem 0' }}>Frequently Asked Questions</h2>

        {faqs.map(section => {
          const items = search
            ? section.items.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
            : section.items;
          if (items.length === 0) return null;
          return (
            <div key={section.section} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <i className={`fas fa-${section.icon}`} style={{ color: '#374151', fontSize: '1.25rem' }}></i>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{section.section}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((faq, i) => {
                  const key = `${section.section}-${i}`;
                  const isOpen = openFaq === key;
                  return (
                    <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <button onClick={() => setOpenFaq(isOpen ? null : key)}
                        style={{ width: '100%', padding: '1rem', background: 'white', border: 'none', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}
                        onMouseOver={e => e.currentTarget.style.background = '#f9fafb'}
                        onMouseOut={e => e.currentTarget.style.background = 'white'}>
                        <span>{faq.q}</span>
                        <i className={`fas fa-chevron-${isOpen ? 'up' : 'right'}`} style={{ color: '#6b7280', flexShrink: 0, marginLeft: '1rem' }}></i>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 1rem 1rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.a}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
