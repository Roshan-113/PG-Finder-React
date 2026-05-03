export default function TermsOfService() {
  return (
    <section style={{ padding: '80px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Terms of Service</h1>
          <p style={{ color: '#6b7280', marginBottom: '32px' }}>Last updated: April 7, 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#374151', lineHeight: 1.7 }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
              <p>By accessing and using PG Finder, you accept and agree to be bound by these Terms of Service.</p>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>2. User Accounts</h2>
              <p style={{ marginBottom: '16px' }}>When you create an account with us, you must:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>3. User Responsibilities</h2>
              <p style={{ marginBottom: '16px' }}>As a user of PG Finder, you agree to:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Provide truthful and accurate information in listings and profiles</li>
                <li>Not post false, misleading, or fraudulent content</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>4. PG Listings</h2>
              <p style={{ marginBottom: '16px' }}>For PG owners and landlords:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>You must have legal authority to list the property</li>
                <li>All listing information must be accurate and up-to-date</li>
                <li>Photos must accurately represent the property</li>
                <li>You must disclose all relevant property details</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>5. Limitation of Liability</h2>
              <p>PG Finder acts as a platform connecting tenants and PG owners. We are not responsible for the accuracy of listings, the quality of accommodations, or disputes between users.</p>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>6. Termination</h2>
              <p>We reserve the right to suspend or terminate your account at any time for violation of these terms.</p>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>7. Contact Information</h2>
              <p style={{ marginBottom: '16px' }}>For questions about these terms, contact us:</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><i className="fas fa-envelope" style={{ color: '#2563eb', marginRight: '8px' }}></i>Email: support@pgfinder.com</li>
                <li><i className="fas fa-phone" style={{ color: '#2563eb', marginRight: '8px' }}></i>Phone: +91 98765 43210</li>
                <li><i className="fas fa-map-marker-alt" style={{ color: '#2563eb', marginRight: '8px' }}></i>Address: Bangalore, India</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e5e7eb' }}>
            <a href="/" style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>Back to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
