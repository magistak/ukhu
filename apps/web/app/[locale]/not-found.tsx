import Link from 'next/link';
import { buildRoute, defaultLocale } from '@ukhu/i18n';

export default function LocaleNotFound() {
  return (
    <section style={{ display: 'grid', gap: '1rem' }}>
      <h1>Page not found</h1>
      <p>We could not find that page. Try returning to the home page.</p>
      <Link href={buildRoute(defaultLocale, 'home')}>Go home</Link>
    </section>
  );
}
