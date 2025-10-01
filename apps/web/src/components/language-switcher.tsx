'use client';

import { usePathname, useRouter } from 'next/navigation';
import { buildLocalePath, locales, type Locale } from '@ukhu/i18n';
import styles from './language-switcher.module.css';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className={styles.label}>
      <span className={styles.labelText}>
        {label}
      </span>
      <select
        className={styles.select}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          const target = buildLocalePath(nextLocale, pathname ?? '/');
          router.push(target);
        }}
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
