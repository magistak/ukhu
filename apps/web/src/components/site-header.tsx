import Link from 'next/link';
import { buildRoute, type Locale, type RouteKey } from '@ukhu/i18n';
import { LanguageSwitcher } from './language-switcher';

interface SiteHeaderProps {
  locale: Locale;
  navigation: Array<{
    key: RouteKey;
    label: string;
  }>;
  languageLabel: string;
}

export function SiteHeader({ locale, navigation, languageLabel }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container flex" style={{
        justifyContent: 'space-between',
        padding: 'var(--space-lg) var(--space-md)'
      }}>
        <Link 
          href={`/${locale}`} 
          style={{ 
            fontWeight: 700, 
            fontSize: 'var(--text-xl)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)'
          }}
        >
          🇭🇺↔🇬🇧 HU↔UK Portal
        </Link>
        <nav>
          <ul>
            {navigation.map((item) => (
              <li key={item.key}>
                <Link href={buildRoute(locale, item.key)}>{item.label}</Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher locale={locale} label={languageLabel} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
