// src/Terms.tsx

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

export default function Terms() {
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
          Terms &amp; Conditions
        </h1>
        <p style={pStyle}>
          These Terms &amp; Conditions ("Terms") govern your access to and use of the Lumentry platform, operated by <strong>PA Media Ltd</strong>, a company registered in England and Wales ("we", "us", "our"). By creating an account or using our platform, you agree to be bound by these Terms.
        </p>
        <p style={pStyle}>
          If you do not agree with any part of these Terms, you must not use our platform. For questions, contact us at <a href="mailto:legal@lumentry.io">legal@lumentry.io</a>.
        </p>

        <h2 style={h2Style}>1. Acceptance of Terms</h2>
        <p style={pStyle}>
          By registering for or using Lumentry, you confirm that you are at least 18 years old, have the legal capacity to enter into binding contracts, and accept these Terms in full. If you are using Lumentry on behalf of a business, you represent that you have authority to bind that business to these Terms.
        </p>
        <p style={pStyle}>
          We may update these Terms from time to time. Continued use of the platform after changes are published constitutes acceptance of the revised Terms. We will notify you of material changes via email or an in-app notice.
        </p>

        <h2 style={h2Style}>2. Use of the Platform</h2>
        <p style={pStyle}>
          Lumentry provides booking management, client relationship, marketing, and related tools for businesses ("Operators") and enables end-users to make bookings with those Operators ("Clients").
        </p>
        <p style={pStyle}>You agree not to:</p>
        <ul style={{ paddingLeft: '20px', margin: '0 0 14px' }}>
          <li style={liStyle}>Use the platform for any unlawful purpose or in violation of any applicable laws or regulations.</li>
          <li style={liStyle}>Attempt to gain unauthorised access to any part of the platform or its related systems.</li>
          <li style={liStyle}>Transmit any harmful, offensive, defamatory, or fraudulent content.</li>
          <li style={liStyle}>Reverse-engineer, decompile, or attempt to extract the source code of any part of the platform.</li>
          <li style={liStyle}>Use automated means (bots, scrapers) to access the platform without our prior written consent.</li>
          <li style={liStyle}>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
        </ul>
        <p style={pStyle}>
          We reserve the right to suspend or terminate your account immediately if you breach these Terms or if we reasonably suspect fraudulent or abusive behaviour.
        </p>

        <h2 style={h2Style}>3. Accounts and Subscriptions</h2>
        <p style={pStyle}>
          You are responsible for maintaining the security of your account credentials. You must notify us immediately at <a href="mailto:legal@lumentry.io">legal@lumentry.io</a> if you suspect any unauthorised access to your account.
        </p>
        <p style={pStyle}>
          Lumentry is offered on a subscription basis with plans as detailed on our <a href="/#pricing">Pricing page</a>. Your subscription grants you a non-exclusive, non-transferable licence to use the platform for your business during the subscription period.
        </p>
        <p style={pStyle}>
          Subscription plans, features, and pricing may change. We will give you at least 30 days' notice before any price increase takes effect for existing subscribers.
        </p>

        <h2 style={h2Style}>4. Payments</h2>
        <p style={pStyle}>
          All payments are processed securely by <strong>Stripe, Inc.</strong> Lumentry does not store your full card details. By providing your payment information, you authorise us to charge your payment method for the subscription fees and any other charges you incur.
        </p>
        <p style={pStyle}>
          Subscription fees are billed in advance on a monthly or annual basis (as selected). All prices are quoted in GBP and are exclusive of VAT unless otherwise stated. VAT will be charged where applicable.
        </p>
        <p style={pStyle}>
          In the event of a failed payment, we will make reasonable attempts to collect payment. If payment cannot be collected within 7 days of the due date, your account may be downgraded or suspended.
        </p>

        <h2 style={h2Style}>5. Cancellation Policy</h2>
        <p style={pStyle}>
          You may cancel your subscription at any time from your account settings or by contacting us at <a href="mailto:legal@lumentry.io">legal@lumentry.io</a>. Cancellations take effect at the end of your current billing period — you will retain access to the platform until that date.
        </p>
        <p style={pStyle}>
          We do not offer refunds for partial subscription periods, except where required by law (e.g. the 14-day cooling-off period under UK Consumer Contracts Regulations 2013, where applicable). Operators using Lumentry for business purposes waive this cooling-off right upon first use of the platform.
        </p>
        <p style={pStyle}>
          We reserve the right to terminate your account for cause (breach of these Terms, fraudulent activity, non-payment) with immediate effect. In such cases, no refund will be issued.
        </p>

        <h2 style={h2Style}>6. End-Client Bookings</h2>
        <p style={pStyle}>
          Lumentry facilitates bookings between Operators and their Clients. The booking contract is between the Operator and the Client — Lumentry is not a party to that contract. Operators are solely responsible for their booking policies, pricing, cancellations, and the quality of their services.
        </p>
        <p style={pStyle}>
          Lumentry is not responsible for any disputes, losses, or claims arising between Operators and Clients. Operators must ensure their use of Lumentry for client communications complies with applicable data protection and marketing laws, including UK GDPR.
        </p>

        <h2 style={h2Style}>7. Intellectual Property</h2>
        <p style={pStyle}>
          The Lumentry platform, including all software, designs, text, graphics, logos, and other content, is owned by PA Media Ltd and protected by UK and international intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of the platform without our express written consent.
        </p>
        <p style={pStyle}>
          You retain ownership of any content you upload to the platform (e.g. your business logo, venue descriptions). By uploading content, you grant us a non-exclusive, royalty-free licence to host, display, and use that content solely to provide the platform to you.
        </p>

        <h2 style={h2Style}>8. Disclaimer of Warranties</h2>
        <p style={pStyle}>
          The platform is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components. To the fullest extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>

        <h2 style={h2Style}>9. Limitation of Liability</h2>
        <p style={pStyle}>
          To the maximum extent permitted by applicable law, PA Media Ltd and its officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, lost data, or business interruption, arising out of or related to your use of the platform.
        </p>
        <p style={pStyle}>
          Our total aggregate liability to you for any claim arising from or related to these Terms or your use of the platform will not exceed the total fees paid by you to Lumentry in the three (3) months preceding the event giving rise to the claim.
        </p>
        <p style={pStyle}>
          Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.
        </p>

        <h2 style={h2Style}>10. Third-Party Integrations</h2>
        <p style={pStyle}>
          Lumentry integrates with third-party services including Stripe, Google, and Xero. Your use of these integrations is subject to the respective third parties' terms of service and privacy policies. We are not responsible for the availability, accuracy, or content of third-party services.
        </p>

        <h2 style={h2Style}>11. Governing Law and Jurisdiction</h2>
        <p style={pStyle}>
          These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of <strong>England and Wales</strong>.
        </p>
        <p style={pStyle}>
          The courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or their subject matter or formation.
        </p>

        <h2 style={h2Style}>12. General</h2>
        <ul style={{ paddingLeft: '20px', margin: '0 0 14px' }}>
          <li style={liStyle}><strong>Entire agreement:</strong> These Terms constitute the entire agreement between you and PA Media Ltd regarding the platform and supersede all prior agreements.</li>
          <li style={liStyle}><strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force.</li>
          <li style={liStyle}><strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right.</li>
          <li style={liStyle}><strong>Assignment:</strong> You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights to any successor or acquirer.</li>
        </ul>

        <h2 style={h2Style}>13. Contact</h2>
        <p style={pStyle}>
          For any questions about these Terms:<br />
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
