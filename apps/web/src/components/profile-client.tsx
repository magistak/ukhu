'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  type User
} from 'firebase/auth';
import { getFirebaseAuth } from '@ukhu/firebase';

interface ProfileClientProps {
  labels: {
    title: string;
    intro: string;
    email: string;
    password: string;
    signin: string;
    signout: string;
    signup: string;
    reset: string;
    resetHint: string;
    cancel: string;
    success: string;
    error: string;
  };
}

type Mode = 'signin' | 'signup' | 'reset';

export function ProfileClient({ labels }: ProfileClientProps) {
  const auth = getFirebaseAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });
  }, [auth]);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    setStatus('loading');
    setMessage('');

    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email);
      }

      setStatus('success');
      setMessage(labels.success);
      if (mode === 'reset') {
        setMode('signin');
      }
      event.currentTarget.reset();
    } catch (error) {
      console.error('Firebase auth error:', error);
      setStatus('error');
      // Show more specific error message for debugging
      const errorMessage = error instanceof Error ? error.message : labels.error;
      setMessage(errorMessage);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Firebase signout error:', error);
      setStatus('error');
      // Show more specific error message for debugging
      const errorMessage = error instanceof Error ? error.message : labels.error;
      setMessage(errorMessage);
    }
  }

  if (user) {
    return (
      <div style={{ display: 'grid', gap: '1rem' }}>
        <h2>{labels.title}</h2>
        <p>{user.email}</p>
        <button
          onClick={handleSignOut}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'black',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {labels.signout}
        </button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '360px' }}>
      <p>{labels.intro}</p>
      <form onSubmit={handleAuth} style={{ display: 'grid', gap: '1rem' }}>
        <label style={{ display: 'grid', gap: '0.25rem' }}>
          <span>{labels.email}</span>
          <input
            type="email"
            name="email"
            required
            style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          />
        </label>
        {mode !== 'reset' && (
          <label style={{ display: 'grid', gap: '0.25rem' }}>
            <span>{labels.password}</span>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
            />
          </label>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'black',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {status === 'loading'
            ? '...'
            : mode === 'signin'
            ? labels.signin
            : mode === 'signup'
            ? labels.signup
            : labels.reset}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {mode !== 'signin' && (
          <button type="button" onClick={() => setMode('signin')}>
            {labels.signin}
          </button>
        )}
        {mode !== 'signup' && (
          <button type="button" onClick={() => setMode('signup')}>
            {labels.signup}
          </button>
        )}
        {mode !== 'reset' && (
          <button type="button" onClick={() => setMode('reset')}>
            {labels.reset}
          </button>
        )}
        {mode === 'reset' && (
          <button type="button" onClick={() => setMode('signin')}>
            {labels.cancel}
          </button>
        )}
      </div>
      {mode === 'reset' && <p>{labels.resetHint}</p>}
    </div>
  );
}
