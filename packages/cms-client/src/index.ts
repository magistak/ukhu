import { z } from 'zod';
import type { Locale } from '@ukhu/i18n';

const GuideSchema = z.object({
  id: z.union([z.number(), z.string()]),
  slug: z.string(),
  locale: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  topic: z.array(z.string()).optional(),
  audience: z.array(z.string()).optional(),
  updatedAt: z.string().optional()
});

export type Guide = z.infer<typeof GuideSchema>;

const FaqSchema = z.object({
  id: z.union([z.number(), z.string()]),
  locale: z.string(),
  question: z.string(),
  answer: z.string()
});

export type Faq = z.infer<typeof FaqSchema>;

export interface GuidesQuery {
  locale: Locale;
  topic?: string;
  audience?: string;
  page?: number;
}

export interface GuideBySlugQuery {
  locale: Locale;
  slug: string;
}

export interface CmsClientOptions {
  preview?: boolean;
}

const mockGuides: Guide[] = [
  {
    id: 'mock-guide-1',
    slug: 'first-steps',
    locale: 'en',
    title: 'First steps after arriving in the UK',
    excerpt: 'Register your address, health care, and tax number.',
    topic: ['arrival'],
    audience: ['hu-to-uk']
  },
  {
    id: 'mock-guide-1-hu',
    slug: 'elso-lepesek',
    locale: 'hu',
    title: 'Első lépések az Egyesült Királyságban',
    excerpt: 'Lakóhelybejelentés, egészségügyi regisztráció, adószám.',
    topic: ['arrival'],
    audience: ['hu-to-uk']
  }
];

const mockFaqs: Faq[] = [
  {
    id: 'mock-faq-1',
    locale: 'en',
    question: 'Do I need a visa to work in Hungary?',
    answer: 'Check the UK government guidance. Most nationals will need a work permit.'
  },
  {
    id: 'mock-faq-1-hu',
    locale: 'hu',
    question: 'Szükségem van vízumra az Egyesült Királyságban?',
    answer: 'Az aktuális információkért nézd meg a hivatalos kormányzati útmutatót.'
  }
];

function getWpRestBase(): string | null {
  const url = process.env.WORDPRESS_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, '');
}

const WP_USERNAME = process.env.WORDPRESS_API_USERNAME;
const WP_PASSWORD = process.env.WORDPRESS_API_PASSWORD;

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Accept', 'application/json');
  
  // Use Application Password authentication (HTTP Basic Auth)
  if (WP_USERNAME && WP_PASSWORD) {
    const credentials = btoa(`${WP_USERNAME}:${WP_PASSWORD}`);
    headers.set('Authorization', `Basic ${credentials}`);
  }

  const response = await fetch(input, {
    ...init,
    headers
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${input}: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function buildGuidesEndpoint(
  base: string,
  query: GuidesQuery,
  options: CmsClientOptions = {}
): string {
  const params = new URLSearchParams({
    lang: query.locale,
    per_page: '20'
  });
  if (query.topic) params.set('topic', query.topic);
  if (query.audience) params.set('audience', query.audience);
  if (query.page) params.set('page', String(query.page));
  if (options.preview) params.set('status', 'draft');
  return `${base.replace(/\/$/, '')}/wp-json/wp/v2/guides?${params.toString()}`;
}

interface WpGuideResponse {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  meta?: Record<string, unknown>;
}

function normalizeGuide(payload: WpGuideResponse, locale: Locale): Guide {
  return {
    id: payload.id,
    slug: payload.slug,
    locale,
    title: payload.title.rendered,
    excerpt: payload.excerpt?.rendered,
    content: payload.content?.rendered,
    topic: Array.isArray(payload.meta?.topics)
      ? (payload.meta?.topics as string[])
      : undefined,
    audience: Array.isArray(payload.meta?.audience)
      ? (payload.meta?.audience as string[])
      : undefined,
    updatedAt: typeof payload.meta?.updatedAt === 'string' ? (payload.meta?.updatedAt as string) : undefined
  };
}

export async function getGuides(
  query: GuidesQuery,
  options: CmsClientOptions = {}
): Promise<Guide[]> {
  const base = getWpRestBase();

  if (!base) {
    return mockGuides.filter((guide) => guide.locale === query.locale);
  }

  const endpoint = buildGuidesEndpoint(base, query, options);
  const result = await fetchJson<WpGuideResponse[]>(endpoint);

  return result.map((item) => normalizeGuide(item, query.locale)).filter((guide) => GuideSchema.safeParse(guide).success);
}

export async function getGuideBySlug(
  query: GuideBySlugQuery,
  options: CmsClientOptions = {}
): Promise<Guide | null> {
  const base = getWpRestBase();
  if (!base) {
    const mock = mockGuides.find(
      (guide) => guide.locale === query.locale && guide.slug === query.slug
    );
    return mock ?? null;
  }

  const params = new URLSearchParams({
    lang: query.locale,
    slug: query.slug,
    per_page: '1'
  });
  if (options.preview) params.set('status', 'draft');

  const endpoint = `${base}/wp-json/wp/v2/guides?${params.toString()}`;
  const result = await fetchJson<WpGuideResponse[]>(endpoint);
  const guide = result[0];
  if (!guide) return null;

  return normalizeGuide(guide, query.locale);
}

interface WpFaqResponse {
  id: number;
  title: { rendered: string };
  content?: { rendered?: string };
}

function normalizeFaq(payload: WpFaqResponse, locale: Locale): Faq {
  return {
    id: payload.id,
    locale,
    question: payload.title.rendered,
    answer: payload.content?.rendered ?? ''
  };
}

export async function getFaqs(locale: Locale, options: CmsClientOptions = {}): Promise<Faq[]> {
  const base = getWpRestBase();
  if (!base) {
    return mockFaqs.filter((faq) => faq.locale === locale);
  }

  const params = new URLSearchParams({
    lang: locale,
    per_page: '50'
  });
  if (options.preview) params.set('status', 'draft');

  const endpoint = `${base}/wp-json/wp/v2/faqs?${params.toString()}`;
  const result = await fetchJson<WpFaqResponse[]>(endpoint);

  return result.map((item) => normalizeFaq(item, locale)).filter((faq) => FaqSchema.safeParse(faq).success);
}
