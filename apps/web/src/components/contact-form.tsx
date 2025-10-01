'use client';

import { useState, FormEvent } from 'react';
import styles from './contact-form.module.css';

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
    <div className={`card ${styles.formContainer}`}>
      <h3 className={styles.formTitle}>{labels.formTitle}</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>{labels.name}</span>
          <input
            name="name"
            type="text"
            required
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{labels.email}</span>
          <input
            name="email"
            type="email"
            required
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{labels.message}</span>
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
          <div className={`${styles.message} ${status === 'success' ? styles.messageSuccess : styles.messageError}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
