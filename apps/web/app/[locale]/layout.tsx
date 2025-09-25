import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { buildNavigation } from '@/lib/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@ukhu/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    return {};
  }

  const locale = localeParam as Locale;
  
  if (locale === 'hu') {
    return {
      title: {
        template: '%s | UK Költözés Portál',
        default: 'UK Költözés Portál'
      },
      description: 'Teljes útmutatók és források a britanniai letelepedéshez magyar állampolgároknak.',
      alternates: {
        languages: {
          hu: '/hu',
          en: '/en'
        }
      },
      other: {
        'content-language': 'hu'
      }
    };
  }
  
  return {
    title: {
      template: '%s | Hungary Migration Portal',
      default: 'Hungary Migration Portal'
    },
    description: 'Complete guides and resources for relocating to Hungary from anywhere in the world.',
    alternates: {
      languages: {
        hu: '/hu',
        en: '/en'
      }
    },
    other: {
      'content-language': 'en'
    }
  };
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<DictionaryShape>(locale);
  
  // Set correct HTML lang attribute via client-side effect
  const htmlLangScript = `
    (function() {
      document.documentElement.lang = '${locale}';
    })();
  `;

  const navigationLabels = {
    guides: dictionary.navigation.guides,
    faq: dictionary.navigation.faq,
    about: dictionary.navigation.about,
    contact: dictionary.navigation.contact,
    profile: dictionary.navigation.profile,
    home: dictionary.navigation.home
  } as const;

  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: htmlLangScript }} />
      <SiteHeader
        locale={locale}
        navigation={buildNavigation(locale, navigationLabels)}
        languageLabel={dictionary.language.label}
      />
      <main>{children}</main>
      <SiteFooter legal={dictionary.footer.legal} />
    </div>
  );
}

type DictionaryShape = {
  navigation: Record<'home' | 'guides' | 'faq' | 'about' | 'contact' | 'profile', string>;
  footer: { legal: string };
  language: { label: string };
};
