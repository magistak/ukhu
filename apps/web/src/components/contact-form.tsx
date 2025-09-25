'use client';

import { useState, FormEvent } from 'react';

interface ContactFormProps {
  locale: string;
  labels: {
    formTitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    submitting: string;
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
    <div className="card" style={{ maxWidth: '600px' }}>
      <h3 style={{ marginTop: 0, marginBottom: 'var(--space-lg)' }}>{labels.formTitle}</h3>
      <form onSubmit={handleSubmit} className="grid" style={{ gap: 'var(--space-lg)' }}>
        <label style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <span>{labels.name}</span>
          <input
            name="name"
            type="text"
            required
          />
        </label>
        <label style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <span>{labels.email}</span>
          <input
            name="email"
            type="email"
            required
          />
        </label>
        <label style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <span>{labels.message}</span>
          <textarea
            name="message"
            rows={5}
            required
          />
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary"
          style={{ 
            opacity: status === 'loading' ? 0.7 : 1 
          }}
        >
          {status === 'loading' ? labels.submitting : labels.submit}
        </button>
        {message && (
          <div style={{ 
            padding: 'var(--space-md)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: status === 'success' ? '#dcfce7' : '#fef2f2',
            color: status === 'success' ? '#166534' : '#dc2626',
            border: `1px solid ${status === 'success' ? '#bbf7d0' : '#fecaca'}`
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
