import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { buildNavigation } from '@/lib/navigation';
import { getDictionary, isLocale, locales, type Locale } from '@ukhu/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = await getDictionary<DictionaryShape>(locale);

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
