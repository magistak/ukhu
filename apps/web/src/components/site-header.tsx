'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildRoute, type Locale, type RouteKey } from '@ukhu/i18n';
import { LanguageSwitcher } from './language-switcher';
import { MobileMenu } from './mobile-menu';
import styles from './site-header.module.css';

interface SiteHeaderProps {
  locale: Locale;
  navigation: Array<{
    key: RouteKey;
    label: string;
  }>;
  languageLabel: string;
}

export function SiteHeader({ locale, navigation, languageLabel }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href={`/${locale}`} className={styles.logo}>
            {locale === 'hu' ? '🇭🇺→🇬🇧 UK Relocation' : '🇬🇧←🇭🇺 Hungary Portal'}
          </Link>
          
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.key}>
                  <Link href={buildRoute(locale, item.key)} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <LanguageSwitcher locale={locale} label={languageLabel} />
              </li>
            </ul>
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        locale={locale}
        navigation={navigation}
        languageLabel={languageLabel}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
