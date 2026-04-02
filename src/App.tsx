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

const FEATURE_HIGHLIGHTS = [
  {
    icon: '📅',
    title: 'Smart Booking',
    desc: 'A beautiful, branded booking page your clients can use 24/7 — from any device, no app required.',
  },
  {
    icon: '👥',
    title: 'Client Management',
    desc: 'Track visits, spending, and loyalty. Know exactly who your best clients are and keep them coming back.',
  },
  {
    icon: '📣',
    title: 'Marketing Tools',
    desc: 'Send targeted email and SMS campaigns, run promo codes, and automate win-back messages with ease.',
  },
]

const INDUSTRY_PILLS = [
  'Music Studio', 'Hair Salon', 'Barber', 'Beauty Salon', 'Nail Studio',
  'Yoga Studio', 'Gym', 'Holiday Let', 'Tattoo Studio', 'Massage Therapy',
  'Photography Studio', 'Co-working', 'Event Space', 'Rehearsal Room',
]

const STEPS = [
  {
    number: '01',
    title: 'Sign up in minutes',
    desc: 'Create your account, tell us about your business, and choose your plan. No contract, no credit card required. You\'ll be live in under 10 minutes.',
  },
  {
    number: '02',
    title: 'Set up your services',
    desc: 'Add your team, services, availability, and pricing. Everything is managed from one clean dashboard — no technical knowledge needed.',
  },
  {
    number: '03',
    title: 'Start taking bookings',
    desc: 'Share your booking link or embed it on your site. Payments, reminders, and access codes are all automated from the moment you go live.',
  },
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

function CheckIcon({ light = false }: { light?: boolean }) {
  const bg = light ? 'rgba(99,102,241,0.10)' : 'rgba(99,102,241,0.12)'
  const border = light ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.3)'
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="7.5" cy="7.5" r="7" fill={bg} stroke={border} />
      <path d="M4.5 7.5l2 2 4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0)',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #e5e5ea' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <HexLogo size={28} />
        <span style={{
          fontFamily: "'Sora', system-ui, sans-serif",
          fontSize: '18px', fontWeight: 700,
          letterSpacing: '-0.02em', color: '#1a1a2e',
        }}>
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
            style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1a1a2e')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >
            {link}
          </a>
        ))}
        <button
          onClick={onTrialClick}
          style={{
            height: '38px', padding: '0 20px', borderRadius: '10px',
            background: '#1a1a2e', color: '#fff',
            fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start free trial
        </button>
      </div>

      {/* Mobile CTA */}
      <button
        onClick={onTrialClick}
        className="md:hidden"
        style={{
          height: '36px', padding: '0 16px', borderRadius: '9px',
          background: '#1a1a2e', color: '#fff',
          fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Free trial
      </button>
    </nav>
  )
}

// ── Mock Screen ───────────────────────────────────────────────────────────────

function MockScreen() {
  return (
    <div style={{
      width: '100%', maxWidth: '680px', margin: '56px auto 0',
      borderRadius: '16px', overflow: 'hidden',
      border: '1px solid #e5e5ea',
      boxShadow: '0 32px 80px rgba(26,26,46,0.12), 0 4px 16px rgba(0,0,0,0.05)',
      animation: 'slideUp 1s ease 0.2s both',
    }}>
      {/* Browser chrome */}
      <div style={{
        background: '#f5f5f7', borderBottom: '1px solid #e5e5ea',
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: '26px', background: '#fff', borderRadius: '6px',
          border: '1px solid #e5e5ea', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '11px', color: '#86868b', fontWeight: 500,
        }}>
          book.yourbusiness.com
        </div>
      </div>

      {/* App UI */}
      <div style={{ background: '#fff' }}>
        {/* Top strip */}
        <div style={{
          borderBottom: '1px solid #f0f0f5', padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', background: '#1a1a2e', borderRadius: '4px' }} />
            <div style={{ height: '10px', width: '90px', background: '#e5e5ea', borderRadius: '3px' }} />
          </div>
          <div style={{ height: '28px', width: '110px', background: '#1a1a2e', borderRadius: '8px' }} />
        </div>

        {/* Main content */}
        <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
          {/* Calendar */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ height: '13px', width: '55%', background: '#1a1a2e', borderRadius: '3px', marginBottom: '7px' }} />
              <div style={{ height: '10px', width: '38%', background: '#e5e5ea', borderRadius: '3px' }} />
            </div>
            <div style={{ background: '#fafafa', borderRadius: '12px', border: '1px solid #f0f0f5', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ height: '10px', width: '80px', background: '#1a1a2e', borderRadius: '3px' }} />
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#e5e5ea', borderRadius: '4px' }} />
                  <div style={{ width: '20px', height: '20px', background: '#e5e5ea', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', marginBottom: '5px' }}>
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: '9px', color: '#86868b', fontWeight: 700 }}>{d}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} style={{
                    height: '22px', borderRadius: '5px',
                    background: i === 15 ? '#1a1a2e' : i === 8 ? '#f0eeff' : '#fff',
                    border: `1px solid ${i === 15 ? '#1a1a2e' : '#f0f0f5'}`,
                    opacity: i < 2 ? 0.3 : 1,
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div style={{ width: '120px', flexShrink: 0 }}>
            <div style={{ height: '10px', width: '70%', background: '#e5e5ea', borderRadius: '3px', marginBottom: '14px', marginTop: '2px' }} />
            {['09:00','10:00','11:00','12:00','14:00','15:00'].map((t, i) => (
              <div key={t} style={{
                padding: '7px 10px', borderRadius: '8px', marginBottom: '6px',
                background: i === 1 ? '#1a1a2e' : '#fafafa',
                border: `1px solid ${i === 1 ? '#1a1a2e' : '#e5e5ea'}`,
                fontSize: '11px', fontWeight: 600,
                color: i === 1 ? '#fff' : '#374151',
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero({ onTrialClick }: { onTrialClick: () => void }) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: '140px',
      paddingBottom: '100px',
      paddingLeft: '24px',
      paddingRight: '24px',
      textAlign: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #f8f7ff 0%, #ffffff 60%)',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.08) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto', animation: 'slideUp 0.7s ease both' }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 14px', marginBottom: '28px',
          background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)',
          borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#6366f1',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
          Now in early access · 1 month free trial
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Sora', system-ui, sans-serif",
          fontSize: 'clamp(40px, 6.5vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#1a1a2e',
          margin: '0 0 24px',
        }}>
          The smarter way to<br />
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>run your bookings</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          fontWeight: 400,
          color: '#6b7280',
          lineHeight: 1.65,
          maxWidth: '540px',
          margin: '0 auto 40px',
        }}>
          Give clients a beautiful way to book online, and give yourself the tools to manage, market, and grow — all in one place.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onTrialClick}
            style={{
              height: '52px', padding: '0 32px', borderRadius: '12px',
              background: '#1a1a2e', color: '#fff',
              fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Start free trial →
          </button>
          <a href="#how-it-works">
            <button
              style={{
                height: '52px', padding: '0 32px', borderRadius: '12px',
                background: 'transparent', color: '#1a1a2e',
                fontSize: '16px', fontWeight: 600,
                border: '1.5px solid #d1d5db', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'border-color 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              See how it works
            </button>
          </a>
        </div>

        {/* Social proof */}
        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '20px', fontWeight: 500 }}>
          Trusted by studios, salons and fitness pros across the UK
        </p>
      </div>

      {/* Mock screen */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <MockScreen />
      </div>
    </section>
  )
}

// ── Industry Strip ────────────────────────────────────────────────────────────

function IndustryStrip() {
  return (
    <section style={{
      padding: '48px 24px',
      background: '#f9f9fb',
      borderTop: '1px solid #e5e5ea',
      borderBottom: '1px solid #e5e5ea',
    }}>
      <p style={{
        textAlign: 'center',
        fontSize: '12px', fontWeight: 700,
        color: '#9ca3af', letterSpacing: '0.15em',
        textTransform: 'uppercase', margin: '0 0 24px',
      }}>
        Built for every booking business
      </p>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px',
        justifyContent: 'center', maxWidth: '900px', margin: '0 auto',
      }}>
        {INDUSTRY_PILLS.map(pill => (
          <span key={pill} style={{
            display: 'inline-block',
            padding: '7px 16px',
            borderRadius: '999px',
            border: '1px solid #e5e5ea',
            background: '#fff',
            fontSize: '13px', fontWeight: 500, color: '#374151',
            whiteSpace: 'nowrap',
          }}>
            {pill}
          </span>
        ))}
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesGrid() {
  return (
    <section id="features" style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontSize: '12px', fontWeight: 700, color: '#6366f1',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            Everything you need
          </p>
          <h2 style={{
            fontFamily: "'Sora', system-ui, sans-serif",
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700, letterSpacing: '-0.025em',
            color: '#1a1a2e', margin: '0 0 16px',
          }}>
            Everything your business needs
          </h2>
          <p style={{ fontSize: '17px', color: '#6b7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
            One platform to run bookings, manage clients, and grow your revenue — no extra tools needed.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {FEATURE_HIGHLIGHTS.map(f => (
            <div key={f.title} className="feature-card">
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '20px',
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 10px',
              }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────

function StepImage({ index }: { index: number }) {
  const bgs = [
    'linear-gradient(135deg, #f0eeff 0%, #e8f4ff 100%)',
    'linear-gradient(135deg, #fdf0ff 0%, #f0eeff 100%)',
    'linear-gradient(135deg, #f0fff8 0%, #e8f4ff 100%)',
  ]
  const icons = ['📅', '⚙️', '🚀']
  return (
    <div style={{
      width: '100%', aspectRatio: '4/3',
      background: bgs[index], borderRadius: '20px',
      border: '1px solid #e5e5ea',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '12px',
    }}>
      <span style={{ fontSize: '52px' }}>{icons[index]}</span>
      <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Screenshot coming soon</p>
    </div>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: '#f9f9fb' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{
            fontSize: '12px', fontWeight: 700, color: '#6366f1',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            Simple setup
          </p>
          <h2 style={{
            fontFamily: "'Sora', system-ui, sans-serif",
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700, letterSpacing: '-0.025em',
            color: '#1a1a2e', margin: '0 0 16px',
          }}>
            Up and running in three steps
          </h2>
          <p style={{ fontSize: '17px', color: '#6b7280', maxWidth: '440px', margin: '0 auto', lineHeight: 1.65 }}>
            No technical setup. No integrations. Just sign up, configure, and go live.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="how-step"
              style={{
                display: 'flex',
                flexDirection: i % 2 === 1 ? 'row-reverse' : 'row',
                gap: '60px', alignItems: 'center',
              }}
            >
              {/* Text side */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                  <span style={{
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontSize: '88px', fontWeight: 800,
                    color: '#f0f0f5', lineHeight: 1,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    position: 'absolute', top: '-24px', left: '-8px',
                    zIndex: 0,
                  }}>
                    {step.number}
                  </span>
                  <span style={{
                    position: 'relative', zIndex: 1,
                    fontSize: '12px', fontWeight: 700,
                    color: '#6366f1', letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'block', paddingTop: '36px',
                  }}>
                    Step {step.number}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 700, letterSpacing: '-0.02em',
                  color: '#1a1a2e', margin: '8px 0 16px',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7, margin: 0, maxWidth: '420px' }}>
                  {step.desc}
                </p>
              </div>

              {/* Image side */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <StepImage index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const FREE_BADGE = (
  <span style={{
    fontSize: '11px', fontWeight: 700, padding: '3px 10px',
    background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
    borderRadius: '999px', color: '#6366f1',
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
    <div className={`pricing-card${featured ? ' featured' : ''}`} style={{
      display: 'flex', flexDirection: 'column',
      transform: featured ? 'scale(1.03)' : 'scale(1)',
      zIndex: featured ? 1 : 0,
    }}>
      {/* Gradient top accent for Business */}
      {featured && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          borderRadius: '18px 18px 0 0',
        }} />
      )}

      {/* Most Popular badge */}
      {featured && (
        <div style={{
          position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff', fontSize: '11px', fontWeight: 800,
          padding: '4px 16px', borderRadius: '999px',
          letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
        }}>
          Most Popular
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{
            fontSize: '13px', fontWeight: 700,
            color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{label}</span>
          {FREE_BADGE}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{
            fontFamily: "'Sora', system-ui, sans-serif",
            fontSize: featured ? '58px' : '50px',
            fontWeight: 800, color: '#1a1a2e', lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>{price}</span>
          <span style={{ fontSize: '14px', color: '#9ca3af' }}>/mo + VAT</span>
        </div>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: '6px 0 0' }}>{tagline}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: note ? '16px' : '32px', flex: 1 }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <CheckIcon />
            <span style={{ fontSize: '14px', color: '#374151' }}>{f}</span>
          </div>
        ))}
      </div>
      {note && (
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 20px', fontStyle: 'italic' }}>{note}</p>
      )}

      <button
        onClick={() => onTrialClick(plan)}
        style={{
          width: '100%',
          height: featured ? '52px' : '46px',
          borderRadius: '12px',
          fontSize: '15px', fontWeight: 600,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          border: featured ? 'none' : '1.5px solid #1a1a2e',
          background: featured ? '#1a1a2e' : 'transparent',
          color: featured ? '#fff' : '#1a1a2e',
          transition: 'opacity 0.2s, transform 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        Start free trial
      </button>
    </div>
  )
}

function Pricing({ onTrialClick }: { onTrialClick: (plan?: Plan) => void }) {
  const handleClick = (plan: Plan) => onTrialClick(plan)

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{
            fontSize: '12px', fontWeight: 700, color: '#6366f1',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            Simple pricing
          </p>
          <h2 style={{
            fontFamily: "'Sora', system-ui, sans-serif",
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700, letterSpacing: '-0.025em',
            color: '#1a1a2e', margin: '0 0 16px',
          }}>
            Start free. Grow fast.
          </h2>
          <p style={{ fontSize: '17px', color: '#6b7280', maxWidth: '400px', margin: '0 auto', lineHeight: 1.65 }}>
            One month free on every plan. No credit card required.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
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

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '36px' }}>
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
      borderTop: '1px solid #e5e5ea',
      background: '#fff',
    }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'flex-start',
          gap: '40px', marginBottom: '48px',
        }}>
          {/* Left */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '12px' }}>
              <HexLogo size={24} />
              <span style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontSize: '17px', fontWeight: 700,
                letterSpacing: '-0.02em', color: '#1a1a2e',
              }}>Lumentry</span>
            </a>
            <p style={{ fontSize: '13px', color: '#9ca3af', maxWidth: '220px', lineHeight: 1.6, margin: 0 }}>
              Smart booking and venue management for modern businesses.
            </p>
          </div>

          {/* Right: links */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#d1d5db', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px', marginTop: 0 }}>Product</p>
              {['Features', 'Pricing', 'Login'].map(l => (
                <a key={l} href={l === 'Login' ? 'https://book.studio-808.com' : `#${l.toLowerCase()}`}
                  style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1a1a2e')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                >{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#d1d5db', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px', marginTop: 0 }}>Legal</p>
              {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                <a key={l} href="#"
                  style={{ display: 'block', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1a1a2e')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e5e5ea', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#d1d5db', margin: 0 }}>
            © 2026 Lumentry. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: '#d1d5db', margin: 0 }}>
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
        maxWidth: step === 2 ? '940px' : '480px',
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
                    ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                    : 'rgba(255,255,255,0.1)',
                  transition: 'width 0.3s, background 0.3s',
                }} />
              ))}
            </div>
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#f5f5f7', margin: 0, fontFamily: "'Sora', system-ui, sans-serif" }}>
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Choose your plan'}
              {step === 3 && "You're all set 🎉"}
            </p>
            {step < 3 && (
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                {step === 1 && '1 month free trial · No credit card required'}
                {step === 2 && 'All plans include a 1-month free trial'}
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
                  onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
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
                  onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
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
                  onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
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
                  onFocus={e => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
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
                {(['pro', 'business', 'enterprise'] as Plan[]).map(plan => {
                  const { price, features } = planDetails[plan]
                  const isFeatured = plan === 'business'
                  const PLAN_LABELS: Record<Plan, string> = { pro: 'Pro', business: 'Business', enterprise: 'Enterprise' }
                  return (
                    <div
                      key={plan}
                      style={{
                        background: '#0d0d0d',
                        border: `1px solid ${isFeatured ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '16px', padding: '28px',
                        position: 'relative', overflow: 'hidden',
                      }}
                    >
                      {isFeatured && (
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {PLAN_LABELS[plan]}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '999px', color: '#818cf8' }}>1 month free</span>
                      </div>
                      <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: '36px', fontWeight: 800, color: '#f5f5f7', margin: '0 0 2px', lineHeight: 1, letterSpacing: '-0.03em' }}>{price}</p>
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
                        className={isFeatured ? 'grad-btn' : 'ghost-btn'}
                        style={{ width: '100%', height: '44px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                      >
                        {loading ? 'Creating your account…' : `Select ${PLAN_LABELS[plan]}`}
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
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: '28px',
              }}>🎉</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f5f5f7', margin: '0 0 10px', fontFamily: "'Sora', system-ui, sans-serif" }}>
                Your trial has started!
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', margin: '0 0 32px', lineHeight: 1.6 }}>
                Your 1-month free trial has started. We're setting up your account — you'll receive a confirmation email shortly.
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '14px 20px', background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px',
                marginBottom: '24px',
              }}>
                <div style={{ width: '18px', height: '18px', border: '2px solid rgba(99,102,241,0.4)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
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
        <IndustryStrip />
        <FeaturesGrid />
        <HowItWorks />
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
