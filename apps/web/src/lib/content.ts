import {
  getGuides,
  getGuideBySlug,
  getFaqs,
  type Guide,
  type GuidesQuery
} from '@ukhu/cms-client';
import type { Locale } from '@ukhu/i18n';

export async function loadGuides(locale: Locale, filters?: Omit<GuidesQuery, 'locale'>) {
  return getGuides({ locale, ...filters });
}

export async function loadGuide(locale: Locale, slug: string) {
  return getGuideBySlug({ locale, slug });
}

export async function loadFaqs(locale: Locale) {
  return getFaqs(locale);
}

export type { Guide };
