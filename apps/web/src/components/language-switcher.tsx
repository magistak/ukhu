'use client';

import { usePathname, useRouter } from 'next/navigation';
import { buildLocalePath, locales, type Locale } from '@ukhu/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          const target = buildLocalePath(nextLocale, pathname ?? '/');
          router.push(target);
        }}
        style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
