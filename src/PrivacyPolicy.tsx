// src/PrivacyPolicy.tsx

function HexLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2l12 7v14l-12 7L4 23V9z" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="1" />
      <circle cx="16" cy="13" r="3.5" fill="white" />
      <path d="M14 16.5l-.5 5.5h5l-.5-5.5" fill="white" />
    </svg>
  )
}

const ACCENT = '#6366f1'
const DARK   = '#1a1a2e'

const h2Style: React.CSSProperties = {
  fontFamily: "'Sora', system-ui, sans-serif",
  fontSize: '20px', fontWeight: 700, color: DARK,
  margin: '40px 0 12px', letterSpacing: '-0.02em',
}
const pStyle: React.CSSProperties = {
  fontSize: '15px', color: '#4b5563', lineHeight: 1.8, margin: '0 0 14px',
}
const liStyle: React.CSSProperties = {
  fontSize: '15px', color: '#4b5563', lineHeight: 1.8, marginBottom: '6px',
}

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'DM Sans', system-ui, sans-serif; background: #f9f9fb; }
        a { color: ${ACCENT}; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        height: '64px', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e5e5ea',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <HexLogo size={28} />
          <span style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: DARK }}>
            Lumentry
          </span>
        </a>
        <a href="/" style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px', fontWeight: 500 }}>Last updated: 5 April 2026</p>
        <h1 style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: DARK, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
          Privacy Policy
        </h1>
        <p style={pStyle}>
          Lumentry is operated by <strong>PA Media Ltd</strong>, a UK limited company ("we", "us", "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at <a href="https://lumentry.io">lumentry.io</a>.
        </p>
        <p style={pStyle}>
          If you have questions or concerns about this policy or our practices, please contact us at <a href="mailto:legal@lumentry.io">legal@lumentry.io</a>.
        </p>

        <h2 style={h2Style}>1. Who We Are</h2>
        <p style={pStyle}>
          <strong>Data Controller:</strong> PA Media Ltd, operating as Lumentry.<br />
          <strong>Contact:</strong> <a href="mailto:legal@lumentry.io">legal@lumentry.io</a><br />
          <strong>Website:</strong> <a href="https://lumentry.io">https://lumentry.io</a>
        </p>
        <p style={pStyle}>
          We are registered in England and Wales. As a controller of your personal data, we are responsible for deciding how and why your personal data is processed.
        </p>

        <h2 style={h2Style}>2. Data We Collect</h2>
        <p style={pStyle}>We collect personal data in the following categories:</p>
        <ul style={{ paddingLeft: '20px', margin: '0 0 14px' }}>
          <li style={liStyle}><strong>Account data:</strong> name, email address, business name, phone number, and password (hashed) when you register.</li>
          <li style={liStyle}><strong>Booking data:</strong> dates, times, services booked, and any notes provided during the booking process.</li>
          <li style={liStyle}><strong>Payment data:</strong> billing address and partial card details (last 4 digits, expiry). Full card numbers are never stored by us — see Stripe below.</li>
          <li style={liStyle}><strong>Communication data:</strong> emails and SMS messages sent through our platform, and records of those communications.</li>
          <li style={liStyle}><strong>Usage data:</strong> IP address, browser type, pages visited, and actions taken on our platform (via server logs and analytics).</li>
          <li style={liStyle}><strong>Marketing preferences:</strong> opt-in/out status for promotional emails and SMS.</li>
        </ul>

        <h2 style={h2Style}>3. How We Use Your Data</h2>
        <p style={pStyle}>We use personal data to:</p>
        <ul style={{ paddingLeft: '20px', margin: '0 0 14px' }}>
          <li style={liStyle}>Create and manage your account and bookings.</li>
          <li style={liStyle}>Process payments and send receipts.</li>
          <li style={liStyle}>Send booking confirmations, reminders, and access codes via email and SMS.</li>
          <li style={liStyle}>Send marketing communications where you have consented or where we have a legitimate interest (e.g. win-back emails for lapsed customers).</li>
          <li style={liStyle}>Improve our platform, troubleshoot issues, and ensure security.</li>
          <li style={liStyle}>Comply with legal obligations.</li>
        </ul>
        <p style={pStyle}>
          <strong>Legal basis (UK GDPR):</strong> We rely on <em>contract performance</em> to provide our service, <em>legitimate interests</em> for security and service improvement, <em>consent</em> for marketing communications, and <em>legal obligation</em> where required by law.
        </p>

        <h2 style={h2Style}>4. Third-Party Services</h2>
        <p style={pStyle}>We use the following third-party services that may process your personal data on our behalf:</p>

        <p style={{ ...pStyle, marginBottom: '6px' }}><strong>Stripe (Payments)</strong></p>
        <p style={pStyle}>
          Stripe Inc. processes all card payments on our platform. Stripe is PCI-DSS Level 1 certified. Your full card details are transmitted directly to Stripe and are never stored on our servers. Stripe's privacy policy is available at <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">stripe.com/gb/privacy</a>.
        </p>

        <p style={{ ...pStyle, marginBottom: '6px' }}><strong>Supabase (Database & Authentication)</strong></p>
        <p style={pStyle}>
          Your account data, bookings, and related records are stored in a PostgreSQL database hosted by Supabase, Inc. Data is stored in the EU (eu-west-1). Supabase's privacy policy is available at <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">supabase.com/privacy</a>.
        </p>

        <p style={{ ...pStyle, marginBottom: '6px' }}><strong>Xero (Accounting Integration — optional)</strong></p>
        <p style={pStyle}>
          If you connect Xero via our integrations feature, we will read invoice and contact data from your Xero account to display it within Lumentry. We do not write data to Xero without your explicit action. Xero's privacy policy is available at <a href="https://www.xero.com/uk/legal/privacy/" target="_blank" rel="noopener noreferrer">xero.com/uk/legal/privacy</a>.
        </p>

        <p style={{ ...pStyle, marginBottom: '6px' }}><strong>Google (Calendar Integration — optional)</strong></p>
        <p style={pStyle}>
          If you connect Google Calendar, we access your calendar to prevent double-bookings and write confirmed bookings to your calendar. We request only the minimum scopes required. Google's privacy policy is available at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.
        </p>

        <p style={{ ...pStyle, marginBottom: '6px' }}><strong>Resend (Email Delivery)</strong></p>
        <p style={pStyle}>
          Transactional and marketing emails are delivered via Resend, Inc. Email content and recipient addresses are processed by Resend to facilitate delivery.
        </p>

        <p style={{ ...pStyle, marginBottom: '6px' }}><strong>Railway / Vercel (Hosting)</strong></p>
        <p style={pStyle}>
          Our backend is hosted on Railway and our frontend on Vercel. Server logs containing IP addresses and usage data are retained by these providers in accordance with their respective privacy policies.
        </p>

        <h2 style={h2Style}>5. Cookies</h2>
        <p style={pStyle}>
          We use strictly necessary cookies and session tokens to keep you authenticated. We do not use advertising or tracking cookies. If we introduce analytics or marketing cookies in the future, we will update this policy and obtain appropriate consent.
        </p>

        <h2 style={h2Style}>6. Data Retention</h2>
        <p style={pStyle}>
          We retain your personal data for as long as your account is active or as needed to provide our service. If you close your account, we will delete or anonymise your personal data within 90 days, except where we are required to retain it by law (e.g. financial records for 6 years under UK tax law).
        </p>
        <p style={pStyle}>
          Booking and payment records are retained for 6 years to comply with HMRC record-keeping requirements.
        </p>

        <h2 style={h2Style}>7. Your Rights (UK GDPR)</h2>
        <p style={pStyle}>Under UK data protection law, you have the following rights:</p>
        <ul style={{ paddingLeft: '20px', margin: '0 0 14px' }}>
          <li style={liStyle}><strong>Right of access:</strong> Request a copy of the personal data we hold about you.</li>
          <li style={liStyle}><strong>Right to rectification:</strong> Ask us to correct inaccurate or incomplete data.</li>
          <li style={liStyle}><strong>Right to erasure:</strong> Ask us to delete your personal data ("right to be forgotten"), subject to legal obligations.</li>
          <li style={liStyle}><strong>Right to restrict processing:</strong> Ask us to limit how we use your data in certain circumstances.</li>
          <li style={liStyle}><strong>Right to data portability:</strong> Receive a copy of your data in a structured, commonly used format.</li>
          <li style={liStyle}><strong>Right to object:</strong> Object to processing based on legitimate interests, including direct marketing.</li>
          <li style={liStyle}><strong>Rights related to automated decision-making:</strong> We do not make solely automated decisions that produce legal or similarly significant effects.</li>
        </ul>
        <p style={pStyle}>
          To exercise any of these rights, please email <a href="mailto:legal@lumentry.io">legal@lumentry.io</a>. We will respond within 30 days. You also have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong> at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
        </p>

        <h2 style={h2Style}>8. International Data Transfers</h2>
        <p style={pStyle}>
          Some of our third-party providers are based outside the UK/EEA. Where data is transferred internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) or adequacy decisions, in accordance with UK GDPR requirements.
        </p>

        <h2 style={h2Style}>9. Security</h2>
        <p style={pStyle}>
          We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. These include encrypted connections (TLS), hashed passwords, and row-level security on our database. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 style={h2Style}>10. Changes to This Policy</h2>
        <p style={pStyle}>
          We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by displaying a prominent notice on our platform. The "Last updated" date at the top of this page reflects the most recent revision.
        </p>

        <h2 style={h2Style}>11. Contact Us</h2>
        <p style={pStyle}>
          For any privacy-related queries, requests, or complaints:<br />
          <strong>PA Media Ltd (Lumentry)</strong><br />
          Email: <a href="mailto:legal@lumentry.io">legal@lumentry.io</a><br />
          Website: <a href="https://lumentry.io">https://lumentry.io</a>
        </p>
      </main>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid #e5e5ea', background: '#fff', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#d1d5db', margin: 0 }}>
          © 2026 Lumentry (PA Media Ltd). All rights reserved. ·{' '}
          <a href="/privacy-policy" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a>
          {' · '}
          <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
        </p>
      </footer>
    </>
  )
}
