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
  answer: z.string(),
  audience: z.array(z.string()).optional()
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
  // English site: Moving TO Hungary content
  {
    id: 'to-hungary-1',
    slug: 'hungary-residence-permit-guide',
    locale: 'en',
    title: 'Complete Guide to Hungary Residence Permits',
    excerpt: 'Step-by-step process for EU and non-EU citizens to obtain Hungarian residence permits, required documents, and timeline.',
    topic: ['legal'],
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-2',
    slug: 'budapest-housing-guide',
    locale: 'en',
    title: 'Finding Housing in Budapest: Complete Guide',
    excerpt: 'Neighborhood guide, rental market tips, viewing apartments, and avoiding common scams in Budapest.',
    topic: ['housing'],
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-3',
    slug: 'hungarian-healthcare-registration',
    locale: 'en',
    title: 'Registering for Hungarian Healthcare',
    excerpt: 'TAJ card application, choosing a GP, health insurance requirements, and accessing medical services.',
    topic: ['healthcare'],
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-4',
    slug: 'working-in-hungary-guide',
    locale: 'en',
    title: 'Working in Hungary: Permits and Process',
    excerpt: 'Work permit requirements, employment contracts, tax obligations, and employee rights in Hungary.',
    topic: ['work'],
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-5',
    slug: 'hungarian-banking-guide',
    locale: 'en',
    title: 'Opening a Bank Account in Hungary',
    excerpt: 'Required documents, best banks for expats, online banking setup, and understanding Hungarian banking fees.',
    topic: ['finance'],
    audience: ['to-hungary']
  },
  // Hungarian site: Hungarians moving TO UK content
  {
    id: 'hu-to-uk-1',
    slug: 'skilled-worker-viza-utmutato',
    locale: 'hu',
    title: 'Skilled Worker víza - Teljes útmutató 2024',
    excerpt: 'Pontszámítás, támogatói tanúsítvány, angol nyelvvizsga követelmények és a teljes eljárás lépésről lépésre.',
    topic: ['legal'],
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-2',
    slug: 'angol-nyelvvizsga-tipusok',
    locale: 'hu',
    title: 'Angol nyelvvizsga típusok UK vízumhoz',
    excerpt: 'IELTS, TOEFL, PTE összehasonlítása, ponthatárok, regisztráció és felkészülési tippek.',
    topic: ['study'],
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-3',
    slug: 'london-lakas-kereses',
    locale: 'hu',
    title: 'Lakáskeresés Londonban - Gyakorlati útmutató',
    excerpt: 'Kerületek összehasonlítása, bérleti szerződések, letét, és a londoni lakáspiac rejtelmei magyaroknak.',
    topic: ['housing'],
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-4',
    slug: 'national-insurance-szam-igenyles',
    locale: 'hu',
    title: 'National Insurance szám igénylése',
    excerpt: 'Mikor, hol és hogyan igényeld a NI számod. Szükséges dokumentumok és a folyamat lépései.',
    topic: ['work'],
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-5',
    slug: 'gp-regisztracio-angliaban',
    locale: 'hu',
    title: 'GP regisztráció és NHS használata',
    excerpt: 'Háziorvos keresése, regisztrációs folyamat, NHS szolgáltatások és magánegészségügy Angliában.',
    topic: ['healthcare'],
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-6',
    slug: 'brit-bankszamla-nyitas',
    locale: 'hu',
    title: 'Bankszámla nyitás az Egyesült Királyságban',
    excerpt: 'Főbb bankok összehasonlítása, szükséges dokumentumok, credit history építése és pénzügyi tippek.',
    topic: ['finance'],
    audience: ['hu-to-uk']
  }
];

const mockFaqs: Faq[] = [
  // English site: Moving TO Hungary FAQs
  {
    id: 'to-hungary-faq-1',
    locale: 'en',
    question: 'Do I need a visa to move to Hungary?',
    answer: 'EU/EEA citizens can move freely. Non-EU citizens need a residence permit. Americans, Canadians, and others can stay 90 days visa-free but need permits for longer stays or work.',
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-faq-2',
    locale: 'en',
    question: 'How much does it cost to live in Budapest?',
    answer: 'A one-bedroom apartment in Budapest costs €500-800/month. Total monthly budget for a single person: €800-1200 including rent, food, transport, and entertainment.',
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-faq-3',
    locale: 'en',
    question: 'Do I need to speak Hungarian to live there?',
    answer: 'Not required but helpful. English is widely spoken in Budapest, especially in international companies and expat areas. Learning basic Hungarian improves daily life significantly.',
    audience: ['to-hungary']
  },
  {
    id: 'to-hungary-faq-4',
    locale: 'en',
    question: 'What is the job market like for foreigners?',
    answer: 'Strong demand in IT, finance, shared services, and engineering. Budapest is a major hub for multinational companies. German language skills are valuable for many positions.',
    audience: ['to-hungary']
  },
  // Hungarian site: Hungarians moving TO UK FAQs
  {
    id: 'hu-to-uk-faq-1',
    locale: 'hu',
    question: 'Mennyibe kerül a Skilled Worker víza?',
    answer: 'Vízumdíj: £719 (3 év) vagy £1,423 (5 év). Immigration Health Surcharge: £1,035/év. Összesen 3 évre: kb. £4,000-5,000 a dokumentumokkal és nyelvvizsgával együtt.',
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-faq-2',
    locale: 'hu',
    question: 'Mennyi idő alatt kapom meg a vízumot?',
    answer: 'Standard eljárás: 3-8 hét. Priority Service: 5 munkanap (extra £500). Super Priority: 24 óra (extra £1,000). Nyári időszakban tovább tarthat.',
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-faq-3',
    locale: 'hu',
    question: 'Milyen fizetésre számíthatok az UK-ban?',
    answer: 'Minimum: £11.44/óra (2024). IT: £35,000-80,000+. Ápolás: £25,000-40,000. Londoni fizetések 20-30%-kal magasabbak, de a megélhetési költségek is.',
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-faq-4',
    locale: 'hu',
    question: 'Hogyan vihetem át a családomat?',
    answer: 'Spouse/Partner víza: £1,846. Gyermekek: £1,116/gyermek. Pénzügyi követelmény: £29,000+ éves fizetés vagy £88,500 megtakarítás. English requirement a partnerre is vonatkozik.',
    audience: ['hu-to-uk']
  },
  {
    id: 'hu-to-uk-faq-5',
    locale: 'hu',
    question: 'Mikor igényelhetek brit állampolgárságot?',
    answer: '5 év continuous residence után. Indefinite Leave to Remain (ILR) után 1 év. Life in the UK teszt kötelező. Nyelvvizsga: B1 level vagy UK egyetemi diploma.',
    audience: ['hu-to-uk']
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
    return mockGuides.filter((guide) => 
      guide.locale === query.locale && 
      (!query.audience || guide.audience?.includes(query.audience))
    );
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
  meta?: Record<string, unknown>;
}

function normalizeFaq(payload: WpFaqResponse, locale: Locale): Faq {
  return {
    id: payload.id,
    locale,
    question: payload.title.rendered,
    answer: payload.content?.rendered ?? '',
    audience: Array.isArray(payload.meta?.audience)
      ? (payload.meta?.audience as string[])
      : undefined
  };
}

export interface FaqsQuery {
  locale: Locale;
  audience?: string;
}

export async function getFaqs(query: FaqsQuery, options: CmsClientOptions = {}): Promise<Faq[]> {
  const base = getWpRestBase();
  if (!base) {
    return mockFaqs.filter((faq) => 
      faq.locale === query.locale && 
      (!query.audience || faq.audience?.includes(query.audience))
    );
  }

  const params = new URLSearchParams({
    lang: query.locale,
    per_page: '50'
  });
  if (query.audience) params.set('audience', query.audience);
  if (options.preview) params.set('status', 'draft');

  const endpoint = `${base}/wp-json/wp/v2/faqs?${params.toString()}`;
  const result = await fetchJson<WpFaqResponse[]>(endpoint);

  return result.map((item) => normalizeFaq(item, query.locale)).filter((faq) => FaqSchema.safeParse(faq).success);
}
