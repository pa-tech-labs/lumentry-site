import { useState, useEffect, useRef } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Plan = 'pro' | 'business' | 'enterprise'
type ModalStep = 1 | 2 | 3

interface FormData {
  businessName: string
  industry: string
  email: string
  password: string
  plan: Plan | null
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🔐',
    title: 'Smart Lock Integration',
    desc: 'Automate door access with SwitchBot and Sifely locks. Clients get a code only when their booking is live.',
  },
  {
    icon: '📅',
    title: 'Online Booking',
    desc: 'A beautiful, branded booking portal your clients can use 24/7. No app download required.',
  },
  {
    icon: '👥',
    title: 'CRM & Client Management',
    desc: 'Track visits, spending, and engagement. Segment clients automatically by behaviour and loyalty.',
  },
  {
    icon: '📣',
    title: 'Email & SMS Campaigns',
    desc: 'Send beautiful campaign emails and text messages to the right audience at the right time.',
  },
  {
    icon: '🎟️',
    title: 'Promo Codes & Loyalty',
    desc: 'Reward returning clients with promo codes and leaderboard-driven perks that drive repeat bookings.',
  },
  {
    icon: '📊',
    title: 'Analytics & Revenue',
    desc: 'See revenue trends, occupancy rates, and peak hours at a glance. Know your numbers, grow faster.',
  },
]

const BOOKING_MODES = [
  {
    icon: '🎙️',
    title: 'Studios & Spaces',
    subtitle: 'Hourly rooms, rehearsal studios, co-working',
    desc: 'Flexible hourly or multi-hour booking with smart lock automation and time-based pricing tiers.',
  },
  {
    icon: '✂️',
    title: 'Salons & Clinics',
    subtitle: 'Barbers, hair, beauty, therapy',
    desc: 'Service-based bookings with staff allocation, appointment management and client notes.',
  },
  {
    icon: '🏋️',
    title: 'Gyms & Fitness',
    subtitle: 'Classes, PT sessions, memberships',
    desc: 'Class scheduling, capacity limits, drop-in and recurring session booking with membership tiers.',
  },
  {
    icon: '🏠',
    title: 'Airbnb & Venues',
    subtitle: 'Holiday lets, event spaces, photography studios',
    desc: 'Nightly and multi-day bookings with automated check-in codes and external calendar sync.',
  },
]

const MARQUEE_ITEMS = [
  'Recording Studios',
  'Barber Shops',
  'Hair Salons',
  'Gyms & Fitness',
  'Photography Studios',
  'Co-working Spaces',
  'Rehearsal Rooms',
  'Therapy Clinics',
  'Holiday Lets',
  'Event Spaces',
  'Nail Studios',
  'Tattoo Parlours',
]

const PRO_FEATURES = [
  'Online booking portal',
  '1 venue',
  'Up to 3 rooms',
  'Email & SMS campaigns',
  'Promo codes & discounts',
  'Analytics dashboard',
]

const BUSINESS_FEATURES = [
  'Everything in Pro',
  'Up to 3 venues',
  'Up to 5 rooms',
  'Smart lock integration',
  'Automated access codes',
]

const ENTERPRISE_FEATURES = [
  'Everything in Business',
  'Up to 10 venues',
  'Up to 10 rooms',
  'CRM & client management',
  'White label branding',
  'Custom email domain',
  'Leaderboard & loyalty',
  'Automated marketing triggers',
  'Priority support',
]

const INDUSTRIES = [
  'Recording Studio',
  'Barber Shop',
  'Hair Salon',
  'Gym & Fitness',
  'Photography Studio',
  'Co-working Space',
  'Airbnb / Holiday Let',
  'Clinic & Therapy',
  'Event Space',
  'Rehearsal Studio',
  'Other',
]

// ── Tiny Components ───────────────────────────────────────────────────────────

function HexLogo({ size = 28, dark = false }: { size?: number; dark?: boolean }) {
  const fill = dark ? '#1a1a2e' : 'white'
  const stroke = dark ? '#1a1a2e' : 'rgba(255,255,255,0.15)'
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2l12 7v14l-12 7L4 23V9z" fill={dark ? 'white' : '#1a1a2e'} stroke={stroke} strokeWidth="1" />
      <circle cx="16" cy="13" r="3.5" fill={fill} />
      <path d="M14 16.5l-.5 5.5h5l-.5-5.5" fill={fill} />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="7.5" cy="7.5" r="7" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.4)" />
      <path d="M4.5 7.5l2 2 4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar({ onTrialClick }: { onTrialClick: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 24px',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <HexLogo size={30} />
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.05em', color: '#f5f5f7' }}>
          Lumentry
        </span>
      </a>

      {/* Links */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
        {['Features', 'Pricing', 'Login'].map(link => (
          <a
            key={link}
            href={link === 'Login' ? 'https://book.studio-808.com' : `#${link.toLowerCase()}`}
            target={link === 'Login' ? '_blank' : undefined}
            rel={link === 'Login' ? 'noreferrer' : undefined}
            style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            {link}
          </a>
        ))}
        <button
          onClick={onTrialClick}
          className="grad-btn"
          style={{ height: '38px', padding: '0 20px', borderRadius: '999px', fontSize: '14px' }}
        >
          Start free trial
        </button>
      </div>

      {/* Mobile CTA */}
      <button
        onClick={onTrialClick}
        className="grad-btn md:hidden"
        style={{ height: '36px', padding: '0 16px', borderRadius: '999px', fontSize: '13px' }}
      >
        Free trial
      </button>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ onTrialClick }: { onTrialClick: () => void }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 24px 80px',
      overflow: 'hidden',
    }}>
      {/* Mesh background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '15%',
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(236,72,153,0.1) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%',
          width: '400px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
        }} />
      </div>

      <div style={{ position: 'relative', maxWidth: '860px', width: '100%', animation: 'fadeUp 0.8s ease both' }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', marginBottom: '32px',
          background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)',
          borderRadius: '999px', fontSize: '13px', fontWeight: 500, color: '#c4b5fd',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', display: 'inline-block', boxShadow: '0 0 8px #a78bfa' }} />
          Now in early access · 1 month free trial
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(64px, 10vw, 120px)',
          lineHeight: 0.95,
          letterSpacing: '-0.01em',
          margin: '0 0 28px',
          color: '#f5f5f7',
        }}>
          Smart booking.{' '}
          <br />
          <span className="grad-text">Smarter venues.</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(17px, 2vw, 21px)',
          fontWeight: 400,
          color: 'rgba(245,245,247,0.6)',
          lineHeight: 1.6,
          maxWidth: '620px',
          margin: '0 auto 44px',
        }}>
          The all-in-one booking, access and marketing platform for studios, salons, gyms and more.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onTrialClick}
            className="grad-btn"
            style={{ height: '52px', padding: '0 32px', borderRadius: '14px', fontSize: '16px' }}
          >
            Start free trial →
          </button>
          <a href="#features">
            <button
              className="ghost-btn"
              style={{ height: '52px', padding: '0 32px', borderRadius: '14px', fontSize: '16px' }}
            >
              See how it works
            </button>
          </a>
        </div>

        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '20px' }}>
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  )
}

// ── Logos / Marquee ───────────────────────────────────────────────────────────

function LogosBar() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <section style={{
      padding: '72px 0',
      background: '#0f0f0f',
      borderTop: '1px solid #222',
      borderBottom: '1px solid #222',
    }}>
      {/* Label with subtle brand glow behind it */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '240px', height: '32px',
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }} />
        <p style={{
          position: 'relative',
          display: 'inline-block',
          fontSize: '11px', fontWeight: 700,
          color: '#666', letterSpacing: '0.15em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          Trusted by venues across the UK
        </p>
      </div>

      {/* Marquee with CSS mask-image fade edges */}
      <div style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}>
        <div style={{
          display: 'flex',
          animation: 'marquee 28s linear infinite',
          width: 'max-content',
        }}>
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '0 36px',
                fontSize: '14px', fontWeight: 500,
                color: '#777',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(167,139,250,0.6)', flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesGrid() {
  return (
    <section id="features" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Everything you need
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '0.02em',
            color: '#f5f5f7', margin: '0 0 16px',
          }}>
            Built for modern venues
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            One platform to run bookings, doors, marketing and revenue — no integrations needed.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '20px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f5f5f7', margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Booking Modes ─────────────────────────────────────────────────────────────

function BookingModes() {
  return (
    <section style={{
      padding: '100px 24px',
      background: 'rgba(255,255,255,0.015)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#ec4899', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Flexible by design
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '0.02em',
            color: '#f5f5f7', margin: '0 0 16px',
          }}>
            Built for your industry
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
            Configure Lumentry for the exact booking model your business runs on.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {BOOKING_MODES.map((m, i) => {
            const accent = ['rgba(167,139,250,0.12)', 'rgba(236,72,153,0.1)', 'rgba(249,115,22,0.1)', 'rgba(34,197,94,0.1)'][i]
            const accentBorder = ['rgba(167,139,250,0.25)', 'rgba(236,72,153,0.2)', 'rgba(249,115,22,0.2)', 'rgba(34,197,94,0.2)'][i]
            const accentColor = ['#a78bfa', '#ec4899', '#f97316', '#22c55e'][i]
            return (
              <div key={m.title} style={{
                background: '#0f0f0f',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: '18px',
                padding: '32px 28px',
                transition: 'border-color 0.25s, transform 0.25s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accentBorder
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: accent, border: `1px solid ${accentBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', marginBottom: '20px',
                }}>
                  {m.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f5f5f7', margin: '0 0 4px' }}>{m.title}</h3>
                <p style={{ fontSize: '12px', fontWeight: 600, color: accentColor, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.subtitle}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const FREE_BADGE = (
  <span style={{
    fontSize: '11px', fontWeight: 700, padding: '3px 10px',
    background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)',
    borderRadius: '999px', color: '#a78bfa',
  }}>1 month free</span>
)

function PricingCard({
  plan, price, tagline, features, featured, note, onTrialClick,
}: {
  plan: Plan
  price: string
  tagline: string
  features: string[]
  featured?: boolean
  note?: string
  onTrialClick: (plan: Plan) => void
}) {
  const label = plan === 'pro' ? 'Pro' : plan === 'business' ? 'Business' : 'Enterprise'

  return (
    <div style={{
      background: featured ? '#0d0b14' : '#0f0f0f',
      border: featured ? '1px solid rgba(167,139,250,0.5)' : '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: featured ? '40px 32px' : '32px 28px',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      boxShadow: featured ? '0 0 60px rgba(167,139,250,0.1), 0 0 0 1px rgba(167,139,250,0.15)' : 'none',
      transform: featured ? 'scale(1.03)' : 'scale(1)',
      zIndex: featured ? 1 : 0,
      transition: 'box-shadow 0.25s',
    }}>
      {/* Gradient top border for Business */}
      {featured && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, #a78bfa, #ec4899, #f97316)',
          borderRadius: '20px 20px 0 0',
        }} />
      )}

      {/* Most Popular badge */}
      {featured && (
        <div style={{
          position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
          color: '#fff', fontSize: '11px', fontWeight: 800,
          padding: '4px 16px', borderRadius: '999px',
          letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(167,139,250,0.4)',
        }}>
          Most Popular
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
          {FREE_BADGE}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: featured ? '60px' : '52px',
            color: '#f5f5f7', lineHeight: 1,
          }}>{price}</span>
          <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)' }}>/mo + VAT</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '6px 0 0' }}>{tagline}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: note ? '16px' : '32px', flex: 1 }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <CheckIcon />
            <span style={{ fontSize: '14px', color: featured ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.65)' }}>{f}</span>
          </div>
        ))}
      </div>
      {note && (
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: '0 0 20px', fontStyle: 'italic' }}>{note}</p>
      )}

      <button
        onClick={() => onTrialClick(plan)}
        className={featured ? 'grad-btn' : 'ghost-btn'}
        style={{ width: '100%', height: featured ? '52px' : '46px', borderRadius: '12px', fontSize: '15px', fontWeight: 600 }}
      >
        Start free trial
      </button>
    </div>
  )
}

function Pricing({ onTrialClick }: { onTrialClick: (plan?: Plan) => void }) {
  const handleClick = (plan: Plan) => onTrialClick(plan)

  return (
    <section id="pricing" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#f97316', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Simple pricing
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '0.02em',
            color: '#f5f5f7', margin: '0 0 16px',
          }}>
            Start free. Grow fast.
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.6 }}>
            1 month free trial on every plan. No credit card required.
          </p>
        </div>

        {/* Extra top padding to make room for the "Most Popular" pill that pops above the Business card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          alignItems: 'center',
          paddingTop: '18px',
        }}
          className="pricing-grid"
        >
          <PricingCard
            plan="pro"
            price="£29"
            tagline="Perfect for getting started"
            features={PRO_FEATURES}
            onTrialClick={handleClick}
          />
          <PricingCard
            plan="business"
            price="£50"
            tagline="For venues that need access control"
            features={BUSINESS_FEATURES}
            featured
            onTrialClick={handleClick}
          />
          <PricingCard
            plan="enterprise"
            price="£79"
            tagline="Full power for growing businesses"
            features={ENTERPRISE_FEATURES}
            note="Need more? Contact us for a bespoke package"
            onTrialClick={handleClick}
          />
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '36px' }}>
          No credit card required · Cancel anytime · All prices exclude VAT
        </p>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      padding: '60px 24px 40px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#050505',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', marginBottom: '48px' }}>
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '12px' }}>
              <HexLogo size={26} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.05em', color: '#f5f5f7' }}>
                Lumentry
              </span>
            </a>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', maxWidth: '220px', lineHeight: 1.6, margin: 0 }}>
              Smart booking and venue management for modern businesses.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Product</p>
              {['Features', 'Pricing', 'Login'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Legal</p>
              {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                <a key={l} href="#" style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © 2026 Lumentry. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            Built in London 🇬🇧
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── Trial Modal ───────────────────────────────────────────────────────────────

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', height: '46px', padding: '0 14px',
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px', fontSize: '15px', color: '#f5f5f7',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: "'DM Sans', sans-serif",
  transition: 'border-color 0.2s',
}

function TrialModal({ open, onClose, initialPlan }: { open: boolean; onClose: () => void; initialPlan: Plan | null }) {
  const [step, setStep] = useState<ModalStep>(1)
  const [form, setForm] = useState<FormData>({
    businessName: '', industry: '', email: '', password: '', plan: initialPlan,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sync initialPlan when modal opens
  useEffect(() => {
    if (open) {
      setStep(1)
      setError(null)
      setForm(f => ({ ...f, plan: initialPlan }))
    }
  }, [open, initialPlan])

  const overlayRef = useRef<HTMLDivElement>(null)

  if (!open) return null

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleStep1Next = () => {
    if (!form.businessName.trim() || !form.industry || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setError(null)
    // If a plan was pre-selected, skip to step 3 via step 2 (show plan selection)
    setStep(2)
  }

  const handleSelectPlan = async (plan: Plan) => {
    const finalForm = { ...form, plan }
    setForm(finalForm)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://access-hub-production.up.railway.app/api/auth/register-tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: finalForm.businessName,
          industry: finalForm.industry,
          email: finalForm.email,
          password: finalForm.password,
          plan,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? data.message ?? 'Registration failed. Please try again.')
        setLoading(false)
        return
      }
      setStep(3)
    } catch {
      setError('Network error. Please check your connection.')
    }
    setLoading(false)
  }

  const planDetails: Record<Plan, { price: string; features: string[] }> = {
    pro:        { price: '£29/mo', features: PRO_FEATURES },
    business:   { price: '£50/mo', features: BUSINESS_FEATURES },
    enterprise: { price: '£79/mo', features: ENTERPRISE_FEATURES.slice(0, 5) },
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeUp 0.25s ease both',
      }}
      onClick={step === 1 ? (e => { if (e.target === overlayRef.current) onClose() }) : undefined}
    >
      <div style={{
        background: '#111',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: step === 2 ? '720px' : '480px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        transition: 'max-width 0.3s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div>
            {/* Step indicator */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
              {([1, 2, 3] as ModalStep[]).map(n => (
                <div key={n} style={{
                  height: '3px', width: n <= step ? '28px' : '16px',
                  borderRadius: '999px',
                  background: n <= step
                    ? 'linear-gradient(90deg, #a78bfa, #ec4899)'
                    : 'rgba(255,255,255,0.1)',
                  transition: 'width 0.3s, background 0.3s',
                }} />
              ))}
            </div>
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#f5f5f7', margin: 0 }}>
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Choose your plan'}
              {step === 3 && "You're all set 🎉"}
            </p>
            {step < 3 && (
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                {step === 1 && '1 month free trial · No credit card required'}
                {step === 2 && 'Both plans include a 1-month free trial'}
              </p>
            )}
          </div>
          {step === 1 && (
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '20px', padding: '0 0 0 12px', lineHeight: 1 }}
            >×</button>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '28px' }}>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Business name</label>
                <input
                  style={INPUT_STYLE}
                  placeholder="e.g. Skyline Studios"
                  value={form.businessName}
                  onChange={set('businessName')}
                  onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  autoFocus
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Industry</label>
                <select
                  style={{ ...INPUT_STYLE, cursor: 'pointer' }}
                  value={form.industry}
                  onChange={set('industry')}
                  onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                >
                  <option value="" disabled style={{ background: '#111' }}>Select your industry</option>
                  {INDUSTRIES.map(i => <option key={i} value={i} style={{ background: '#111' }}>{i}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Email address</label>
                <input
                  style={INPUT_STYLE}
                  type="email"
                  placeholder="you@yourbusiness.com"
                  value={form.email}
                  onChange={set('email')}
                  onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Password</label>
                <input
                  style={INPUT_STYLE}
                  type="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={set('password')}
                  onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  onKeyDown={e => e.key === 'Enter' && handleStep1Next()}
                />
              </div>
              {error && <p style={{ fontSize: '13px', color: '#f87171', margin: 0, padding: '10px 14px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)' }}>{error}</p>}
              <button
                onClick={handleStep1Next}
                className="grad-btn"
                style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '15px', marginTop: '4px' }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {(['pro', 'enterprise'] as Plan[]).map(plan => {
                  const { price, features } = planDetails[plan]
                  const isEnterprise = plan === 'enterprise'
                  return (
                    <div
                      key={plan}
                      style={{
                        background: '#0d0d0d',
                        border: `1px solid ${isEnterprise ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '16px', padding: '28px',
                        position: 'relative', overflow: 'hidden',
                      }}
                    >
                      {isEnterprise && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #a78bfa, #ec4899, #f97316)' }} />
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {plan === 'pro' ? 'Pro' : 'Enterprise'}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '999px', color: '#a78bfa' }}>1 month free</span>
                      </div>
                      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: '#f5f5f7', margin: '0 0 2px', lineHeight: 1 }}>{price}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '0 0 20px' }}>+ VAT · then monthly</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                        {features.map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                            <CheckIcon /> {f}
                          </div>
                        ))}
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', margin: '4px 0 0' }}>and more…</p>
                      </div>
                      <button
                        onClick={() => !loading && handleSelectPlan(plan)}
                        disabled={loading}
                        className={isEnterprise ? 'grad-btn' : 'ghost-btn'}
                        style={{ width: '100%', height: '44px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                      >
                        {loading ? 'Creating your account…' : `Select ${plan === 'pro' ? 'Pro' : 'Enterprise'}`}
                      </button>
                    </div>
                  )
                })}
              </div>
              {error && <p style={{ fontSize: '13px', color: '#f87171', marginTop: '16px', padding: '10px 14px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)' }}>{error}</p>}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: '28px',
              }}>🎉</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f5f5f7', margin: '0 0 10px' }}>
                Your trial has started!
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: '0 0 32px', lineHeight: 1.6 }}>
                Your 1-month free trial has started. We're setting up your account — you'll receive a confirmation email shortly.
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '14px 20px', background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px',
                marginBottom: '24px',
              }}>
                <div style={{ width: '18px', height: '18px', border: '2px solid rgba(167,139,250,0.4)', borderTopColor: '#a78bfa', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Setting up your workspace…</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                You can close this window and check your email for next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPlan, setModalPlan] = useState<Plan | null>(null)

  const openTrial = (plan?: Plan) => {
    setModalPlan(plan ?? null)
    setModalOpen(true)
  }

  return (
    <>
      <Navbar onTrialClick={() => openTrial()} />
      <main>
        <Hero onTrialClick={() => openTrial()} />
        <LogosBar />
        <FeaturesGrid />
        <BookingModes />
        <Pricing onTrialClick={openTrial} />
      </main>
      <Footer />
      <TrialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={modalPlan}
      />
    </>
  )
}
