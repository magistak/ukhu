'use client';

import { useState, FormEvent } from 'react';

interface ContactFormProps {
  locale: string;
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
}

export function ContactForm({ locale, labels }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      locale
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      setMessage(labels.error);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      setMessage(labels.success);
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage(labels.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '480px' }}>
      <label style={{ display: 'grid', gap: '0.25rem' }}>
        <span>{labels.name}</span>
        <input
          name="name"
          type="text"
          required
          style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />
      </label>
      <label style={{ display: 'grid', gap: '0.25rem' }}>
        <span>{labels.email}</span>
        <input
          name="email"
          type="email"
          required
          style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />
      </label>
      <label style={{ display: 'grid', gap: '0.25rem' }}>
        <span>{labels.message}</span>
        <textarea
          name="message"
          rows={5}
          required
          style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />
      </label>
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
        {status === 'loading' ? '...' : labels.submit}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
