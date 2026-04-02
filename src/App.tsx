import { useState, useEffect, useRef } from 'react'
import { IMG_GRID_1, IMG_GRID_2, IMG_GRID_3, IMG_GRID_4, IMG_GRID_5, IMG_ALT_1, IMG_ALT_2, IMG_ALT_3, IMG_ALT_4, IMG_STEP_1, IMG_STEP_2, IMG_STEP_3 } from './config/images'

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
    title: 'Smart Booking',
    desc: 'A beautiful, branded booking page your clients can use 24/7 — from any device, no app required.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Client Management',
    desc: 'Track visits, spending, and loyalty. Know exactly who your best clients are and keep them coming back.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Marketing Tools',
    desc: 'Send targeted email and SMS campaigns, run promo codes, and automate win-back messages with ease.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    title: 'Smart Lock Access',
    desc: 'Automated door codes sent the moment a booking is confirmed. No keys, no fuss — just seamless entry.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="#6366f1" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Analytics & Insights',
    desc: 'See your busiest times, top-spending clients, and revenue trends — all from one clean dashboard.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Promo Codes & Loyalty',
    desc: 'Create discount codes, reward loyal clients, and run referral campaigns to keep your calendar full.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
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

// ── Dark Band (mid-page) ──────────────────────────────────────────────────────

function DarkBand({ onTrialClick }: { onTrialClick: () => void }) {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .dark-band-stats { flex-direction: column !important; }
          .dark-band-divider { width: 60px !important; height: 1px !important; background: rgba(255,255,255,0.12) !important; }
          .dark-band-stat { padding: 24px 0 !important; }
        }
      `}</style>
      <section style={{ background: '#000', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="animate-on-scroll fade-up" style={{
            fontFamily: "'Sora', system-ui, sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
            color: '#fff', margin: '0 0 64px',
          }}>
            No contracts. No commissions.<br />Just growth.
          </h2>

          {/* Two stat columns */}
          <div className="dark-band-stats" style={{
            display: 'flex', alignItems: 'stretch',
            justifyContent: 'center', margin: '0 0 56px',
          }}>
            <div className="dark-band-stat" style={{ flex: 1, padding: '0 48px' }}>
              <div style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontSize: 'clamp(64px, 9vw, 96px)',
                fontWeight: 800, color: '#fff',
                letterSpacing: '-0.04em', lineHeight: 1,
                marginBottom: '16px',
              }}>£0</div>
              <p style={{
                fontSize: '16px', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6, margin: 0, maxWidth: '240px', marginLeft: 'auto', marginRight: 'auto',
              }}>
                No monthly fees, contracts or surprises.
              </p>
            </div>

            <div className="dark-band-divider" style={{
              width: '1px', background: 'rgba(255,255,255,0.12)', flexShrink: 0,
            }} />

            <div className="dark-band-stat" style={{ flex: 1, padding: '0 48px' }}>
              <div style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontSize: 'clamp(64px, 9vw, 96px)',
                fontWeight: 800, color: '#fff',
                letterSpacing: '-0.04em', lineHeight: 1,
                marginBottom: '16px',
              }}>100%</div>
              <p style={{
                fontSize: '16px', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6, margin: 0, maxWidth: '240px', marginLeft: 'auto', marginRight: 'auto',
              }}>
                Of every booking goes straight to you.
              </p>
            </div>
          </div>

          <button
            onClick={onTrialClick}
            style={{
              height: '52px', padding: '0 36px', borderRadius: '12px',
              background: 'transparent', color: '#fff',
              fontSize: '16px', fontWeight: 600, cursor: 'pointer',
              border: '1.5px solid rgba(255,255,255,0.5)',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
          >
            Start free trial →
          </button>
        </div>
      </section>
    </>
  )
}

// ── Dark CTA (pre-footer) ─────────────────────────────────────────────────────

function DarkCTA({ onTrialClick }: { onTrialClick: () => void }) {
  return (
    <section style={{
      background: '#111',
      padding: '100px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <h2 className="animate-on-scroll fade-up" style={{
          fontFamily: "'Sora', system-ui, sans-serif",
          fontSize: 'clamp(32px, 5.5vw, 60px)',
          fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
          color: '#ffffff', margin: '0 0 20px',
        }}>
          Ready to fill your calendar?
        </h2>
        <p style={{
          fontSize: '18px', color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65, maxWidth: '420px', margin: '0 auto 44px',
        }}>
          Join hundreds of businesses already using Lumentry to save time and grow their bookings.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onTrialClick}
            className="grad-btn"
            style={{
              height: '54px', padding: '0 36px', borderRadius: '12px',
              fontSize: '16px', fontWeight: 600,
            }}
          >
            Start free trial →
          </button>
          <a href="mailto:hello@lumentry.io" style={{ textDecoration: 'none' }}>
            <button
              className="ghost-btn"
              style={{
                height: '54px', padding: '0 32px', borderRadius: '12px',
                fontSize: '16px', fontWeight: 600,
              }}
            >
              Book a demo
            </button>
          </a>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', marginTop: '24px' }}>
          No credit card required · 1 month free · Cancel anytime
        </p>
      </div>
    </section>
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

// ── Hero Grid ─────────────────────────────────────────────────────────────────

function HeroGrid() {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .hero-grid-wrap { padding: 0 16px !important; }
          .hero-grid-row1 { flex-direction: column !important; }
          .hero-grid-row1 > div { height: 260px !important; flex: none !important; width: 100% !important; }
          .hero-grid-row2 > div:not(:first-child) { display: none !important; }
          .hero-grid-row2 > div:first-child { flex: none !important; width: 100% !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1100px', margin: '48px auto 12px', padding: '0 40px' }}>
        <h2 style={{
          fontFamily: "'Sora', system-ui, sans-serif",
          fontSize: 'clamp(24px, 3.5vw, 38px)',
          fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15,
          color: '#1a1a2e', margin: 0, textAlign: 'left',
        }}>
          Built for <em style={{ fontStyle: 'italic', fontWeight: 800 }}>every booking business</em>
        </h2>
      </div>
      <div
        className="hero-grid-wrap"
        style={{
          maxWidth: '1100px', margin: '0 auto 0',
          padding: '0 40px',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}
      >
        {/* Row 1: 55/45 split */}
        <div className="hero-grid-row1" style={{ display: 'flex', gap: '12px' }}>
          <div className="animate-on-scroll scale-in" style={{ transitionDelay: '100ms', flex: '0 0 55%', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src={IMG_GRID_1}
              alt="Studio environment"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
          <div className="animate-on-scroll scale-in" style={{ transitionDelay: '200ms', flex: 1, height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src={IMG_GRID_2}
              alt="Booking dashboard"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
        </div>

        {/* Row 2: 3 equal columns */}
        <div className="hero-grid-row2" style={{ display: 'flex', gap: '12px' }}>
          <div className="animate-on-scroll scale-in" style={{ transitionDelay: '100ms', flex: 1, height: '240px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src={IMG_GRID_3}
              alt="Mobile booking"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
          <div className="animate-on-scroll scale-in" style={{ transitionDelay: '200ms', flex: 1, height: '240px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src={IMG_GRID_4}
              alt="Workspace lifestyle"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
          <div className="animate-on-scroll scale-in" style={{ transitionDelay: '300ms', flex: 1, height: '240px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src={IMG_GRID_5}
              alt="Business owner at laptop"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </>
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

      <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
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
        <h1 className="animate-on-scroll fade-up" style={{
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
        <p className="animate-on-scroll fade-up-delay-1" style={{
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
        <div className="animate-on-scroll fade-up-delay-2" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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

      <HeroGrid />
    </section>
  )
}

// ── Alternating Feature Rows ──────────────────────────────────────────────────

const ALT_ROWS = [
  {
    img: IMG_ALT_1,
    alt: 'Person frustrated at phone',
    imgLeft: true,
    label: 'THE PROBLEM',
    heading: "You're losing bookings while you sleep",
    body: "Every missed call, unanswered DM, or 'I'll book later' is revenue walking out the door. Most small businesses still rely on phone calls and manual back-and-forth — leaving money on the table every single day.",
    bullets: [
      '24/7 online booking — clients book even at 2am',
      'No more DMs, calls or chasing confirmations',
      'Instant booking confirmation sent automatically',
    ],
  },
  {
    img: IMG_ALT_2,
    alt: 'Person smiling at phone notification',
    imgLeft: false,
    label: 'AUTOMATED FOLLOW-UPS',
    heading: "Your business runs even when you're not there",
    body: 'Lumentry handles the entire client journey for you — from booking confirmation to post-visit follow-up. Automated reminders slash no-shows. Win-back campaigns bring lapsed clients back without you lifting a finger.',
    bullets: [
      'Automated SMS & email reminders before every booking',
      'Win-back campaigns triggered when clients go quiet',
      'Upsell messages sent automatically after each visit',
    ],
  },
  {
    img: IMG_ALT_3,
    alt: 'Business owner reviewing analytics on laptop',
    imgLeft: true,
    label: 'CLIENT INTELLIGENCE',
    heading: 'Know exactly who your best clients are',
    body: 'Stop guessing. Lumentry tracks every visit, every pound spent, and every referral — giving you a complete picture of your client base. Reward loyalty, target your top spenders, and stop wasting budget on the wrong people.',
    bullets: [
      'Full visit history and lifetime spend per client',
      'Loyalty leaderboard — see your top clients at a glance',
      'Promo codes and discounts to reward and retain',
    ],
  },
  {
    img: IMG_ALT_4,
    alt: 'Modern studio with smart access panel',
    imgLeft: false,
    label: 'SMART ACCESS',
    heading: 'The tools big brands use — without the big price tag',
    body: 'Smart lock integration, branded booking pages, custom email domains, automated access codes — Lumentry gives your business the infrastructure of an enterprise platform, at a flat monthly rate with no commissions and no contracts.',
    bullets: [
      'Automated door codes sent on booking confirmation',
      'White-label booking page with your own branding',
      'Custom sending domain for a professional email presence',
    ],
  },
]

function AlternatingRows() {
  return (
    <>
      <style>{`
        @media (max-width: 780px) {
          .alt-row { flex-direction: column !important; }
          .alt-row-img { width: 100% !important; flex: none !important; height: 280px !important; }
        }
      `}</style>
      <section style={{ background: '#fff', padding: '0 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {ALT_ROWS.map((row, i) => (
            <div
              key={row.label}
              className="alt-row animate-on-scroll fade-up"
              style={{
                display: 'flex',
                flexDirection: row.imgLeft ? 'row' : 'row-reverse',
                gap: '60px',
                alignItems: 'center',
                padding: '80px 0',
                borderBottom: i < ALT_ROWS.length - 1 ? '1px solid #f0f0f5' : 'none',
              }}
            >
              {/* Image */}
              <div
                className="alt-row-img"
                style={{
                  flex: '0 0 480px', height: '360px',
                  borderRadius: '16px', overflow: 'hidden',
                }}
              >
                <img
                  src={row.img}
                  alt={row.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '12px', fontWeight: 600, color: '#6366f1',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  margin: '0 0 14px',
                }}>{row.label}</p>
                <h3 style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontSize: '32px', fontWeight: 800,
                  color: '#0d0d1a', letterSpacing: '-0.025em', lineHeight: 1.2,
                  margin: '0 0 16px',
                }}>{row.heading}</h3>
                <p style={{
                  fontSize: '16px', color: '#555',
                  lineHeight: 1.7, margin: '0 0 24px',
                }}>{row.body}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {row.bullets.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '15px', lineHeight: '22px', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '15px', color: '#1a1a2e', lineHeight: '22px' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesGrid() {
  return (
    <>
      <style>{`
        .feat-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 20px;
          padding: 32px;
          transition: background 0.2s, border-color 0.2s;
        }
        .feat-card:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
        }
        @media (max-width: 640px) {
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <section id="features" style={{
        padding: '100px 24px',
        background: '#0d0d1a',
        backgroundImage: 'radial-gradient(ellipse at 50% 40%, #1a1a3e 0%, #0d0d1a 65%)',
      }}>
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
              color: '#ffffff', margin: '0 0 16px',
            }}>
              Everything your business needs
            </h2>
            <p style={{ fontSize: '17px', color: '#aaa', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
              One platform to run bookings, manage clients, and grow your revenue — no extra tools needed.
            </p>
          </div>

          <div
            className="feat-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {FEATURE_HIGHLIGHTS.map((f, i) => (
              <div key={f.title} className="feat-card animate-on-scroll scale-in" style={{ transitionDelay: `${(i % 4 + 1) * 100}ms` }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(99,102,241,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 10px',
                }}>{f.title}</h3>
                <p style={{ fontSize: '15px', color: '#999', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────

const STEP_IMAGES = [IMG_STEP_1, IMG_STEP_2, IMG_STEP_3]
const STEP_ALTS = [
  'Sign up and onboard in minutes',
  'Set up your services and availability',
  'Start taking bookings instantly',
]

function StepImage({ index }: { index: number }) {
  return (
    <div style={{
      width: '100%', borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid #e5e5ea',
      boxShadow: '0 12px 40px rgba(26,26,46,0.10)',
    }}>
      <img
        src={STEP_IMAGES[index]}
        alt={STEP_ALTS[index]}
        style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
      />
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
  const label = plan === 'pro' ? 'PRO' : plan === 'business' ? 'BUSINESS' : 'ENTERPRISE'
  const isEnterprise = plan === 'enterprise'

  if (featured) {
    return (
      <div
        style={{
          background: '#0d0d1a',
          border: '2px solid rgba(99,102,241,0.25)',
          borderRadius: '24px',
          padding: '48px 36px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 60px rgba(99,102,241,0.2)',
          transition: 'transform 0.2s',
          zIndex: 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', background: '#6366f1', borderRadius: '999px', color: '#fff' }}>1 month free</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
          <span style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: '72px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>{price}</span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>/mo + VAT</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '0 0 28px' }}>{tagline}</p>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
          {features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckIcon />
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{f}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onTrialClick(plan)}
          style={{
            width: '100%', height: '52px', borderRadius: '999px',
            background: '#fff', color: '#0d0d1a',
            border: 'none', fontSize: '15px', fontWeight: 700,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start free trial
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #e5e5ea',
        borderRadius: '24px',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
        {isEnterprise
          ? <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', border: '1px solid #6366f1', borderRadius: '999px', color: '#6366f1', background: 'transparent' }}>1 month free</span>
          : <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', background: '#f0f0f5', borderRadius: '999px', color: '#374151' }}>1 month free</span>
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
        <span style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: '64px', fontWeight: 900, color: '#0d0d1a', lineHeight: 1, letterSpacing: '-0.04em' }}>{price}</span>
        <span style={{ fontSize: '14px', color: '#9ca3af' }}>/mo + VAT</span>
      </div>
      <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 28px' }}>{tagline}</p>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: note ? '12px' : '32px' }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <CheckIcon />
            <span style={{ fontSize: '14px', color: '#374151' }}>{f}</span>
          </div>
        ))}
      </div>
      {note && <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 20px', fontStyle: 'italic' }}>{note}</p>}

      <button
        onClick={() => onTrialClick(plan)}
        style={{
          width: '100%', height: '52px', borderRadius: '999px',
          background: 'transparent', color: '#0d0d1a',
          border: '1.5px solid #0d0d1a', fontSize: '15px', fontWeight: 700,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Start free trial
      </button>
    </div>
  )
}

function Pricing({ onTrialClick }: { onTrialClick: (plan?: Plan) => void }) {
  const handleClick = (plan: Plan) => onTrialClick(plan)

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: '#f5f5f7' }}>
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
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05,
            margin: '0 0 16px',
          }}>
            <span style={{ color: '#0d0d1a' }}>Start free. </span>
            <span style={{ color: '#6366f1' }}>Grow fast.</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>
            One month free on every plan. No credit card required.
          </p>
        </div>

        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div className="animate-on-scroll fade-up-delay-1"><PricingCard plan="pro" price="£29" tagline="Perfect for getting started" features={PRO_FEATURES} onTrialClick={handleClick} /></div>
          <div className="animate-on-scroll fade-up-delay-2"><PricingCard plan="business" price="£50" tagline="For venues that need access control" features={BUSINESS_FEATURES} featured onTrialClick={handleClick} /></div>
          <div className="animate-on-scroll fade-up-delay-3"><PricingCard plan="enterprise" price="£79" tagline="Full power for growing businesses" features={ENTERPRISE_FEATURES} note="Need more? Contact us for a bespoke package" onTrialClick={handleClick} /></div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          {['No credit card required', 'Cancel anytime', 'All prices exclude VAT'].map(badge => (
            <span key={badge} style={{
              fontSize: '12px', fontWeight: 500, color: '#6b7280',
              padding: '5px 14px', background: '#e8e8ed',
              borderRadius: '999px',
            }}>{badge}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'What is Lumentry?',
    a: 'Lumentry is an all-in-one booking, CRM and marketing platform for studios, salons and service businesses. One flat monthly fee, no commissions.',
  },
  {
    q: 'How do I get started?',
    a: "Sign up, tell us about your business, and you'll have a live booking page in under 10 minutes. No technical setup required.",
  },
  {
    q: 'Do my clients need to download an app?',
    a: 'No. Your clients book through a branded web page on any device. No app download, no account required on their end.',
  },
  {
    q: 'How do payments work?',
    a: "Clients pay at the time of booking via card. Payments go directly to your Stripe account — Lumentry never holds your money.",
  },
  {
    q: 'Can I send email and SMS campaigns?',
    a: 'Yes. Lumentry includes built-in email and SMS marketing tools. Create campaigns, send promo codes, and automate win-back messages from your dashboard.',
  },
  {
    q: 'Is there a contract?',
    a: 'No contracts, no lock-in. You can upgrade, downgrade or cancel your plan at any time.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Sora', system-ui, sans-serif",
          fontSize: 'clamp(36px, 5vw, 48px)',
          fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
          color: '#1a1a2e', margin: '0 0 48px',
        }}>
          FAQs
        </h2>

        <div>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="animate-on-scroll fade-up"
                style={{ borderBottom: '1px solid #e5e5ea', transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '16px',
                    padding: '24px 0', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontSize: '17px', fontWeight: 700,
                    color: '#1a1a2e', lineHeight: 1.4,
                  }}>{item.q}</span>
                  <span style={{
                    flexShrink: 0, width: '28px', height: '28px',
                    borderRadius: '50%', border: '1.5px solid #e5e5ea',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: '#6b7280', lineHeight: 1,
                    transition: 'border-color 0.2s, color 0.2s',
                    fontWeight: 400,
                  }}>
                    {isOpen ? '×' : '+'}
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{
                    fontSize: '15px', color: '#6b7280',
                    lineHeight: 1.7, margin: '0 0 24px',
                    paddingRight: '44px',
                  }}>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const openTrial = (plan?: Plan) => {
    setModalPlan(plan ?? null)
    setModalOpen(true)
  }

  return (
    <>
      <Navbar onTrialClick={() => openTrial()} />
      <main>
        <Hero onTrialClick={() => openTrial()} />
        <AlternatingRows />
        <FeaturesGrid />
        <DarkBand onTrialClick={() => openTrial()} />
        <HowItWorks />
        <Pricing onTrialClick={openTrial} />
        <DarkCTA onTrialClick={() => openTrial()} />
        <FAQ />
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
