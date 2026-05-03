export default function FAQ() {
  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>Find answers to common questions about PG Finder</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* General Questions */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>General Questions</h2>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>What is PG Finder?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              PG Finder is a platform that connects people looking for PG accommodations with property owners. We help you find verified PGs, compatible roommates, and make the entire process hassle-free.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>Is PG Finder free to use?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Yes! PG Finder is completely free for tenants to search and book PGs. Property owners can also list their PGs for free.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>Which cities do you cover?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              We currently cover major cities across India including Bangalore, Mumbai, Delhi, Pune, Hyderabad, Chennai, and more. We're constantly expanding to new cities.
            </div>
          </details>
        </div>

        {/* For Tenants */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>For Tenants</h2>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>How do I search for a PG?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Simply enter your preferred city, budget, and gender preference in the search bar on our homepage. You can also use advanced filters to refine your search based on amenities, room type, and more.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>How do I book a PG?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Once you find a PG you like, click "View Details" to see more information. Then click "Book Now" to fill in your details and confirm your booking. The owner will contact you to finalize the arrangement.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>Can I visit the PG before booking?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Absolutely! We highly recommend visiting the PG and meeting the owner before making any commitments. Use the contact information provided to schedule a visit.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>How does the roommate matching work?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Our roommate matching feature helps you find compatible roommates based on lifestyle preferences, habits, and interests. You can browse profiles and connect with potential roommates directly.
            </div>
          </details>
        </div>

        {/* For Owners */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>For PG Owners</h2>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>How do I list my PG?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Register as an owner, go to your dashboard, and click "Add New PG". Fill in all the required details including photos, amenities, pricing, and location. Your listing will be reviewed and activated within 24 hours.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>How long does verification take?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Our team typically reviews and verifies new listings within 24-48 hours. You'll receive an email notification once your listing is approved.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>Can I edit my listing after posting?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Yes, you can edit your listing anytime from your owner dashboard. Changes to pricing or major details may require re-verification.
            </div>
          </details>
        </div>

        {/* Payment & Security */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Payment & Security</h2>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>How do payments work?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              All payment transactions are directly between tenants and PG owners. PG Finder does not handle payments. We recommend using secure payment methods and getting proper receipts.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>Is my personal information safe?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Yes, we take data security seriously. Your personal information is encrypted and stored securely. We never share your data with third parties without your consent. Read our Privacy Policy for more details.
            </div>
          </details>

          <details style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '24px', fontWeight: 600, color: '#111827' }}>
              <span>What if I face issues with a PG?</span>
              <i className="fas fa-chevron-down" style={{ color: '#9ca3af' }}></i>
            </summary>
            <div style={{ padding: '0 24px 24px', color: '#374151', lineHeight: 1.7 }}>
              Contact our support team immediately at support@pgfinder.com or call +91 98765 43210. We'll help mediate and resolve the issue. You can also report listings that violate our terms.
            </div>
          </details>
        </div>
      </div>

      {/* Still have questions */}
      <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '32px', textAlign: 'center', marginTop: '48px' }}>
        <i className="fas fa-question-circle" style={{ color: '#2563eb', fontSize: '48px', marginBottom: '16px' }}></i>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Still have questions?</h3>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>Can't find the answer you're looking for? Contact our support team.</p>
        <a href="/contact" style={{ display: 'inline-block', padding: '12px 24px', background: '#2563eb', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
          Contact Support
        </a>
      </div>
    </div>
  );
}
