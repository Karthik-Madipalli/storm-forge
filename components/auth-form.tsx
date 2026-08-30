'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error) {
      setError('Unable to authenticate with those details.')
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <main className="auth-screen">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-kicker">STORMFORGE / SECURE ACCESS</div>
        <h1 id="auth-title">{isSignUp ? 'Enter the forge' : 'Welcome back'}</h1>
        <p>{isSignUp ? 'Create your Forge identity to start building.' : 'Sign in to continue your mission.'}</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" /></label>}
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete={isSignUp ? 'new-password' : 'current-password'} /></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="primary-button full" disabled={loading} type="submit">{loading ? 'Authenticating…' : isSignUp ? 'Create account' : 'Sign in'}</button>
        </form>
        <p className="auth-switch">{isSignUp ? 'Already forged?' : 'New to Stormforge?'} <Link href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Sign in' : 'Create account'}</Link></p>
      </section>
    </main>
  )
}
