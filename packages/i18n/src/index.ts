import enDictionary from './dictionaries/en.json' with { type: 'json' };
import huDictionary from './dictionaries/hu.json' with { type: 'json' };

export const locales = ['en', 'hu'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en: enDictionary as Record<string, unknown>,
  hu: huDictionary as Record<string, unknown>
};

export async function getDictionary<T = Record<string, unknown>>(locale: Locale): Promise<T> {
  const dictionary = dictionaries[locale] ?? dictionaries[defaultLocale];
  return dictionary as T;
}

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function otherLocales(locale: Locale): Locale[] {
  return locales.filter((candidate) => candidate !== locale);
}

export function buildLocalePath(locale: Locale, pathname: string): string {
  const sanitized = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const segments = sanitized.split('/').filter(Boolean);

  if (segments[0] && isLocale(segments[0])) {
    segments[0] = locale;
    return `/${segments.join('/')}`;
  }

  const path = segments.length > 0 ? `/${locale}/${segments.join('/')}` : `/${locale}`;
  return path.replace(/\/$/, '') || `/${locale}`;
}

export const ROUTES = {
  home: '/',
  guides: '/guides',
  faq: '/faq',
  about: '/about',
  contact: '/contact',
  profile: '/profile'
} as const;

export type RouteKey = keyof typeof ROUTES;

export function buildRoute(locale: Locale, key: RouteKey): string {
  const route = ROUTES[key];
  const normalized = route === '/' ? '' : route;
  return `/${locale}${normalized}` || `/${locale}`;
}
