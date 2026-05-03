const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      tls: { rejectUnauthorized: false }
    });
    this.fromEmail = process.env.SMTP_USER || 'noreply@pgfinder.com';
    this.fromName = 'PG Finder';
  }

  async send(to, subject, html) {
    const user = process.env.SMTP_USER || '';
    if (!user) {
      console.log(`[EMAIL SKIPPED - no SMTP_USER] To: ${to} | Subject: ${subject}`);
      return true;
    }
    try {
      const info = await this.transporter.sendMail({
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to,
        subject,
        html
      });
      console.log(`✅ Email sent to ${to} | Subject: ${subject} | MsgId: ${info.messageId}`);
      return true;
    } catch (err) {
      console.error(`❌ Email FAILED to ${to} | Subject: ${subject} | Error: ${err.message}`);
      return false;
    }
  }

  // ── 1. Registration / Welcome email — matches Java buildVerificationEmailTemplate ──
  async sendWelcomeEmail(toEmail, userName, userType) {
    const roleMsg = userType === 'tenant'
      ? 'Start exploring PG accommodations and find your perfect home!'
      : userType === 'owner'
      ? 'Start listing your PG properties and connect with potential tenants!'
      : 'Welcome to the PG Finder admin panel.';

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    const html = `<!DOCTYPE html>
<html><head><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:0;background:#f1f5f9;}
  .container{max-width:600px;margin:0 auto;padding:20px;}
  .header{background:linear-gradient(135deg,#0ea5e9 0%,#0284c7 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0;}
  .header h1{margin:0;font-size:26px;font-weight:800;}
  .content{background:#f9fafb;padding:30px;border-radius:0 0 10px 10px;}
  .content p{margin:0 0 16px 0;font-size:15px;}
  .button{display:inline-block;padding:12px 30px;background:#0ea5e9;color:white;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:600;}
  .footer{text-align:center;margin-top:20px;color:#6b7280;font-size:14px;}
</style></head><body>
<div class="container">
  <div class="header"><h1>Welcome to PG Finder!</h1></div>
  <div class="content">
    <p>Hi <strong>${userName}</strong>,</p>
    <p>Thank you for registering with PG Finder. Your account has been created successfully!</p>
    <p>${roleMsg}</p>
    <p style="text-align:center;"><a href="${clientUrl}" class="button">Get Started</a></p>
    <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@pgfinder.com" style="color:#0ea5e9;">support@pgfinder.com</a>.</p>
    <p>Happy house hunting! 🏡</p>
  </div>
  <div class="footer"><p>&copy; 2026 PG Finder. All rights reserved.</p></div>
</div>
</body></html>`;

    return this.send(toEmail, 'Welcome to PG Finder!', html);
  }

  // ── 2. Password Reset email — matches Java buildPasswordResetEmailTemplate ──
  async sendPasswordResetEmail(toEmail, userName, resetLink) {
    const html = `<!DOCTYPE html>
<html><head><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:0;background:#f1f5f9;}
  .container{max-width:600px;margin:0 auto;padding:20px;}
  .header{background:linear-gradient(135deg,#0ea5e9 0%,#0284c7 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0;}
  .header h1{margin:0;font-size:26px;font-weight:800;}
  .content{background:#f9fafb;padding:30px;border-radius:0 0 10px 10px;}
  .content p{margin:0 0 16px 0;font-size:15px;}
  .button{display:inline-block;padding:12px 30px;background:#0ea5e9;color:white;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:600;}
  .link{word-break:break-all;color:#0ea5e9;font-size:13px;}
  .footer{text-align:center;margin-top:20px;color:#6b7280;font-size:14px;}
</style></head><body>
<div class="container">
  <div class="header"><h1>Reset Your Password</h1></div>
  <div class="content">
    <p>Hi <strong>${userName}</strong>,</p>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <p style="text-align:center;"><a href="${resetLink}" class="button">Reset Password</a></p>
    <p>Or copy and paste this link in your browser:</p>
    <p class="link">${resetLink}</p>
    <p>This link will expire in <strong>1 hour</strong>.</p>
    <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
  </div>
  <div class="footer"><p>&copy; 2026 PG Finder. All rights reserved.</p></div>
</div>
</body></html>`;

    return this.send(toEmail, 'Reset Your Password - PG Finder', html);
  }

  // ── 3. Booking Confirmation email — matches Java buildBookingConfirmationEmailTemplate ──
  async sendBookingConfirmationEmail({ toEmail, userName, pgName, address, city, moveInDate, rentAmount, securityDeposit, bookingId, ownerName, ownerPhone, roomNumber }) {
    const total = parseFloat(rentAmount || 0) + parseFloat(securityDeposit || 0);
    const fmt = n => parseFloat(n || 0).toLocaleString('en-IN');
    const invoiceNo = `#BK${String(bookingId || 0).padStart(6, '0')}`;

    const roomRow = roomNumber ? `
      <tr style="background:#f0f9ff;">
        <td style="padding:11px 14px;font-size:13px;color:#1e293b;font-weight:600;border-bottom:1px solid #e2e8f0;">
          Room Allocation<br><span style="font-size:11px;color:#94a3b8;font-weight:400;">Assigned room number</span>
        </td>
        <td style="padding:11px 14px;font-size:13px;color:#374151;text-align:center;border-bottom:1px solid #e2e8f0;">Room ${roomNumber}</td>
        <td style="padding:11px 14px;font-size:13px;color:#374151;text-align:center;border-bottom:1px solid #e2e8f0;">—</td>
        <td style="padding:11px 14px;font-size:13px;color:#1e293b;font-weight:600;text-align:right;border-bottom:1px solid #e2e8f0;">—</td>
      </tr>` : '';

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

  <!-- HEADER -->
  <tr><td style="padding:28px 36px 18px 36px;background:#fff;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <div style="font-size:22px;font-weight:800;color:#1e293b;letter-spacing:-0.5px;">🏠 PG Finder</div>
        <div style="font-size:11px;color:#64748b;margin-top:1px;">Your Home Away From Home</div>
      </td>
      <td style="text-align:right;vertical-align:middle;">
        <div style="font-size:38px;font-weight:900;color:#1e293b;letter-spacing:3px;line-height:1;">RECEIPT</div>
        <div style="margin-top:6px;">
          <span style="background:#dcfce7;color:#15803d;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:0.5px;">&#10003; BOOKING CONFIRMED</span>
        </div>
      </td>
    </tr></table>
  </td></tr>

  <!-- COLOR BAR -->
  <tr><td style="height:10px;background:linear-gradient(90deg,#0ea5e9 70%,#1e293b 100%);"></td></tr>

  <!-- META BOXES -->
  <tr><td style="padding:22px 36px 18px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="55%" style="vertical-align:top;padding-right:12px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1.5px dashed #cbd5e1;border-radius:6px;">
          <tr><td style="padding:14px 18px;">
            <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;border-bottom:1px dashed #e2e8f0;padding-bottom:6px;">Tenant</div>
            <table cellpadding="0" cellspacing="0">
              <tr><td style="font-size:13px;color:#64748b;padding:2px 8px 2px 0;min-width:70px;">Name</td><td style="font-size:13px;font-weight:600;color:#1e293b;padding:2px 0;">${userName}</td></tr>
              <tr><td style="font-size:13px;color:#64748b;padding:2px 8px 2px 0;">PG</td><td style="font-size:13px;font-weight:600;color:#1e293b;padding:2px 0;">${pgName}</td></tr>
              <tr><td style="font-size:13px;color:#64748b;padding:2px 8px 2px 0;">Address</td><td style="font-size:13px;font-weight:600;color:#1e293b;padding:2px 0;">${address}, ${city}</td></tr>
            </table>
          </td></tr>
        </table>
      </td>
      <td width="45%" style="vertical-align:top;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1.5px dashed #cbd5e1;border-radius:6px;">
          <tr><td style="padding:14px 18px;">
            <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;border-bottom:1px dashed #e2e8f0;padding-bottom:6px;">Receipt Info</div>
            <table cellpadding="0" cellspacing="0">
              <tr><td style="font-size:13px;color:#64748b;padding:2px 8px 2px 0;min-width:70px;">Receipt No</td><td style="font-size:13px;font-weight:600;color:#1e293b;padding:2px 0;">${invoiceNo}</td></tr>
              <tr><td style="font-size:13px;color:#64748b;padding:2px 8px 2px 0;">Move-in</td><td style="font-size:13px;font-weight:600;color:#1e293b;padding:2px 0;">${moveInDate}</td></tr>
              <tr><td style="font-size:13px;color:#64748b;padding:2px 8px 2px 0;">Status</td><td style="font-size:13px;font-weight:700;color:#15803d;padding:2px 0;">Confirmed</td></tr>
            </table>
          </td></tr>
        </table>
      </td>
    </tr></table>
  </td></tr>

  <!-- ITEMS TABLE -->
  <tr><td style="padding:0 36px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#1e293b;color:#fff;">
          <th style="padding:12px 16px;text-align:left;font-weight:700;letter-spacing:0.5px;font-size:12px;text-transform:uppercase;width:45%;">Description</th>
          <th style="padding:12px 16px;text-align:center;font-weight:700;font-size:12px;text-transform:uppercase;width:20%;">Details</th>
          <th style="padding:12px 16px;text-align:center;font-weight:700;font-size:12px;text-transform:uppercase;width:15%;">Rate</th>
          <th style="padding:12px 16px;text-align:right;font-weight:700;font-size:12px;text-transform:uppercase;width:20%;">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:13px 16px;color:#374151;vertical-align:top;border-bottom:1px solid #e2e8f0;">
            <div style="font-weight:600;color:#1e293b;margin-bottom:2px;">${pgName}</div>
            <div style="font-size:11px;color:#94a3b8;">Monthly Rent — PG Accommodation</div>
          </td>
          <td style="padding:13px 16px;text-align:center;border-bottom:1px solid #e2e8f0;">1 Month</td>
          <td style="padding:13px 16px;text-align:center;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(rentAmount)}</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#1e293b;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(rentAmount)}</td>
        </tr>
        <tr style="background:#f0f9ff;">
          <td style="padding:13px 16px;color:#374151;vertical-align:top;border-bottom:1px solid #e2e8f0;">
            <div style="font-weight:600;color:#1e293b;margin-bottom:2px;">Security Deposit</div>
            <div style="font-size:11px;color:#94a3b8;">Refundable at end of stay</div>
          </td>
          <td style="padding:13px 16px;text-align:center;border-bottom:1px solid #e2e8f0;">One-time</td>
          <td style="padding:13px 16px;text-align:center;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(securityDeposit)}</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#1e293b;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(securityDeposit)}</td>
        </tr>
        ${roomRow}
        <tr>
          <td style="padding:13px 16px;color:#374151;vertical-align:top;border-bottom:1px solid #e2e8f0;">
            <div style="font-weight:600;color:#1e293b;margin-bottom:2px;">Owner Contact</div>
            <div style="font-size:11px;color:#94a3b8;">${ownerName || ''}${ownerPhone ? ' | ' + ownerPhone : ''}</div>
          </td>
          <td style="padding:13px 16px;text-align:center;border-bottom:1px solid #e2e8f0;">—</td>
          <td style="padding:13px 16px;text-align:center;border-bottom:1px solid #e2e8f0;">—</td>
          <td style="padding:13px 16px;text-align:right;font-weight:600;color:#1e293b;border-bottom:1px solid #e2e8f0;">—</td>
        </tr>
      </tbody>
    </table>
  </td></tr>

  <!-- NOTE + TOTALS -->
  <tr><td style="padding:18px 36px 24px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:top;padding-right:24px;min-width:0;">
        <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Note</div>
        <div style="font-size:12px;color:#64748b;line-height:1.6;">Please carry a valid government ID and address proof on move-in day. Contact the owner to confirm move-in time.</div>
      </td>
      <td width="280" style="vertical-align:top;flex-shrink:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="font-size:13px;color:#64748b;padding:7px 0;border-bottom:1px solid #e2e8f0;">Subtotal</td><td style="font-size:13px;font-weight:600;color:#1e293b;text-align:right;padding:7px 0;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(total)}</td></tr>
          <tr><td style="font-size:13px;color:#64748b;padding:7px 0;border-bottom:1px solid #e2e8f0;">GST / Tax</td><td style="font-size:13px;font-weight:600;color:#1e293b;text-align:right;padding:7px 0;border-bottom:1px solid #e2e8f0;">&#8377;0</td></tr>
          <tr><td style="font-size:13px;color:#64748b;padding:7px 0;border-bottom:1px solid #e2e8f0;">Platform Fee</td><td style="font-size:13px;font-weight:600;color:#1e293b;text-align:right;padding:7px 0;border-bottom:1px solid #e2e8f0;">&#8377;0</td></tr>
          <tr><td style="font-size:13px;color:#64748b;padding:7px 0;border-bottom:1px solid #e2e8f0;">Total</td><td style="font-size:13px;font-weight:600;color:#1e293b;text-align:right;padding:7px 0;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(total)}</td></tr>
          <tr><td style="font-size:13px;color:#64748b;padding:7px 0;border-bottom:1px solid #e2e8f0;">Paid</td><td style="font-size:13px;font-weight:600;color:#15803d;text-align:right;padding:7px 0;border-bottom:1px solid #e2e8f0;">&#8377;${fmt(total)}</td></tr>
          <tr><td colspan="2" style="padding-top:6px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border-radius:6px;border:1.5px solid #bae6fd;">
              <tr>
                <td style="padding:10px 12px;font-size:15px;font-weight:800;color:#1e293b;">Total Due</td>
                <td style="padding:10px 12px;font-size:20px;font-weight:900;color:#0ea5e9;text-align:right;">&#8377;0</td>
              </tr>
            </table>
          </td></tr>
        </table>
      </td>
    </tr></table>
  </td></tr>

  <!-- TERMS -->
  <tr><td style="padding:0 36px 16px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:bottom;">
        <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Terms &amp; Conditions</div>
        <div style="font-size:11px;color:#94a3b8;line-height:1.5;max-width:320px;">Security deposit is refundable subject to property condition. Cancellation policy applies as per booking agreement. PG Finder is not liable for disputes between tenant and owner.</div>
      </td>
      <td style="text-align:right;vertical-align:bottom;font-size:12px;color:#64748b;font-style:italic;">Thank you for your business.</td>
    </tr></table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#1e293b;padding:14px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="text-align:center;">
      <span style="color:#94a3b8;font-size:12px;margin:0 14px;">&#127760; www.pgfinder.com</span>
      <span style="color:#94a3b8;font-size:12px;margin:0 14px;">&#9993; support@pgfinder.com</span>
      <span style="color:#94a3b8;font-size:12px;margin:0 14px;">&#128222; +91 1234567890</span>
    </td></tr></table>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

    return this.send(
      toEmail,
      `Booking Confirmed - ${pgName}${roomNumber ? ` (Room ${roomNumber})` : ''}`,
      html
    );
  }
}

module.exports = new EmailService();
