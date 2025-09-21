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
    <header style={{ background: 'white', borderBottom: '1px solid #e5e5e5' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'min(960px, 90vw)',
          margin: '0 auto',
          padding: '1rem 0'
        }}
      >
        <Link href={`/${locale}`} style={{ fontWeight: 600, fontSize: '1.1rem' }}>
          HU↔UK Portal
        </Link>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: 0, padding: 0 }}>
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
