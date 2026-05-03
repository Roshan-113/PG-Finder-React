export default function Privacy() {
  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Privacy Policy</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Last updated: April 7, 2026</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>1. Information We Collect</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            We collect information that you provide directly to us, including:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Name, email address, and phone number</li>
            <li>Profile information and preferences</li>
            <li>PG listing details (for owners)</li>
            <li>Messages and communications</li>
            <li>Payment information (processed securely)</li>
          </ul>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>2. How We Use Your Information</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            We use the information we collect to:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Provide and improve our services</li>
            <li>Connect tenants with PG owners</li>
            <li>Send you updates and notifications</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Prevent fraud and ensure platform security</li>
          </ul>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>3. Information Sharing</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            We do not sell your personal information. We may share your information:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>With PG owners when you inquire about a listing</li>
            <li>With service providers who assist our operations</li>
            <li>When required by law or to protect our rights</li>
            <li>With your consent or at your direction</li>
          </ul>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>4. Data Security</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>5. Cookies and Tracking</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookies through your browser settings.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>6. Your Rights</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            You have the right to:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>7. Children's Privacy</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            Our service is not intended for users under 18 years of age. We do not knowingly collect information from children.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>8. Changes to Privacy Policy</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>9. Contact Us</h2>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p style={{ color: '#374151' }}>
            <strong>Email:</strong> privacy@pgfinder.com<br />
            <strong>Phone:</strong> +91 98765 43210<br />
            <strong>Address:</strong> Bangalore, India
          </p>
        </div>
      </div>
    </div>
  );
}
