import { useState } from 'react'
import { supabase } from './lib/supabase'

const HexLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 2l12 7v14l-12 7L4 23V9z" fill="#a78bfa" stroke="#a78bfa" strokeWidth="1"/>
    <circle cx="16" cy="13" r="3.5" fill="#0d0d1a"/>
    <path d="M14 16.5l-.5 5.5h5l-.5-5.5" fill="#0d0d1a"/>
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'forgot' | 'sent'>('login')
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResetLoading(true)
    await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: 'https://book.studio-808.com/reset-password',
    })
    setResetLoading(false)
    setMode('sent')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', data.user!.id)
        .single()
      if (profileError) throw profileError

      if (profile?.tenant_id) {
        const { data: tenant } = await supabase
          .from('tenants')
          .select('slug')
          .eq('id', profile.tenant_id)
          .single()
        if (tenant?.slug && data.session) {
          // Pass session tokens in hash so access-hub's Supabase client picks them
          // up via detectSessionInUrl — auth is scoped to the subdomain origin
          const { access_token, refresh_token, expires_in } = data.session
          const hash = `access_token=${access_token}&token_type=bearer&expires_in=${expires_in}&refresh_token=${refresh_token}&type=login`
          window.location.href = `https://${tenant.slug}.lumentry.io/admin#${hash}`
          return
        }
      }

      // Fallback: no slug found — send to access-hub login on Studio 808 domain
      window.location.href = 'https://book.studio-808.com/login'
    } catch {
      setError("Sign in succeeded but we couldn't load your profile — please refresh.")
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d1a',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        .lp-input {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          font-size: 15px;
          color: #f5f5f7;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .lp-input::placeholder { color: rgba(255,255,255,0.3); }
        .lp-input:focus {
          border-color: rgba(167,139,250,0.6);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.15);
        }
        .lp-input:disabled { opacity: 0.5; }
        .lp-btn {
          width: 100%;
          height: 46px;
          background: linear-gradient(135deg, #a78bfa, #ec4899);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: opacity 0.15s;
          letter-spacing: -0.01em;
          font-family: inherit;
        }
        .lp-btn:hover { opacity: 0.88; }
        .lp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Nav */}
      <header style={{
        height: '56px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <HexLogo size={28} />
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7' }}>
            Lumentry
          </span>
        </a>
      </header>

      {/* Main */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Logo + heading */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '36px', gap: '14px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(236,72,153,0.15))',
              border: '1px solid rgba(167,139,250,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HexLogo size={32} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', margin: 0 }}>
                Welcome back
              </h1>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', marginTop: '6px', marginBottom: 0 }}>
                Sign in to your Lumentry account
              </p>
            </div>
          </div>

          {/* Card */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '32px',
          }}>
            {mode === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#4ade80', margin: '0 0 8px' }}>Check your email for a reset link</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '0 0 24px' }}>We sent a password reset link to <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{resetEmail}</strong>.</p>
                <button type="button" className="lp-btn" onClick={() => { setMode('login'); setError(null) }}>Back to sign in</button>
              </div>
            ) : mode === 'forgot' ? (
              <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Email address</label>
                  <input className="lp-input" type="email" placeholder="you@example.com" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required disabled={resetLoading} autoFocus />
                </div>
                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '8px', padding: '10px 14px' }}>
                    <p style={{ fontSize: '13px', color: '#f87171', margin: 0 }}>{error}</p>
                  </div>
                )}
                <button type="submit" className="lp-btn" disabled={resetLoading} style={{ marginTop: '4px' }}>
                  {resetLoading ? 'Sending…' : 'Send reset link'}
                </button>
                <button type="button" onClick={() => { setMode('login'); setError(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'rgba(255,255,255,0.4)', padding: 0, fontFamily: 'inherit' }}>
                  ← Back to sign in
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Email</label>
                  <input className="lp-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} autoComplete="email" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Password</label>
                    <button type="button" onClick={() => { setResetEmail(email); setMode('forgot'); setError(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'rgba(255,255,255,0.4)', padding: 0, fontFamily: 'inherit', textDecoration: 'underline' }}>
                      Forgot password?
                    </button>
                  </div>
                  <input className="lp-input" type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} autoComplete="current-password" />
                </div>
                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '8px', padding: '10px 14px' }}>
                    <p style={{ fontSize: '13px', color: '#f87171', margin: 0 }}>{error}</p>
                  </div>
                )}
                <button type="submit" className="lp-btn" disabled={loading} style={{ marginTop: '4px' }}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
            )}
          </div>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
            Don't have an account?{' '}
            <a href="/#pricing" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 500 }}>
              Start free trial
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
