export default function CookiePolicy() {
  return (
    <section style={{ padding: '80px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Cookie Policy</h1>
          <p style={{ color: '#6b7280', marginBottom: '32px' }}>Last updated: April 7, 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#374151', lineHeight: 1.7 }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>What Are Cookies?</h2>
              <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.</p>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Types of Cookies We Use</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Essential Cookies</h4>
                  <p style={{ margin: 0 }}>These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.</p>
                </div>

                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Performance Cookies</h4>
                  <p style={{ margin: 0 }}>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                </div>

                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Functionality Cookies</h4>
                  <p style={{ margin: 0 }}>These cookies allow the website to remember choices you make and provide enhanced, personalized features.</p>
                </div>

                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Targeting Cookies</h4>
                  <p style={{ margin: 0 }}>These cookies may be set through our site by our advertising partners to build a profile of your interests.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Managing Cookies</h2>
              <p style={{ marginBottom: '16px' }}>You can control and manage cookies in various ways:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Most browsers allow you to refuse or accept cookies</li>
                <li>You can delete cookies that are already stored on your device</li>
                <li>You can set your browser to notify you when cookies are being sent</li>
              </ul>
              <p style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>Note: Disabling cookies may affect the functionality of our website.</p>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Third-Party Cookies</h2>
              <p>We may use third-party services that also use cookies. These include analytics services and payment processors. We do not control these cookies.</p>
            </div>

            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Contact Us</h2>
              <p style={{ marginBottom: '16px' }}>If you have questions about our use of cookies:</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0 }}>
                <li><i className="fas fa-envelope" style={{ color: '#2563eb', marginRight: '8px' }}></i>Email: support@pgfinder.com</li>
                <li><i className="fas fa-phone" style={{ color: '#2563eb', marginRight: '8px' }}></i>Phone: +91 98765 43210</li>
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
