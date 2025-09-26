import { describe, expect, it } from 'vitest';
import { buildGuidesEndpoint, getFaqs } from '@ukhu/cms-client';

describe('cms client', () => {
  it('builds guides endpoint with filters', () => {
    const url = buildGuidesEndpoint('https://cms.example', {
      locale: 'hu',
      topic: 'housing',
      audience: 'hu-to-uk',
      page: 2
    });

    expect(url).toContain('wp-json/wp/v2/guides');
    expect(url).toContain('lang=hu');
    expect(url).toContain('topic=housing');
    expect(url).toContain('audience=hu-to-uk');
    expect(url).toContain('page=2');
  });

  it('builds guides endpoint for english portal', () => {
    const url = buildGuidesEndpoint('https://cms.example', {
      locale: 'en',
      topic: 'work',
      audience: 'to-hungary'
    });

    expect(url).toContain('wp-json/wp/v2/guides');
    expect(url).toContain('lang=en');
    expect(url).toContain('topic=work');
    expect(url).toContain('audience=to-hungary');
  });

  it('filters mock FAQs by audience', async () => {
    // Test Hungarian site FAQs (hu-to-uk)
    const huFaqs = await getFaqs({ locale: 'hu', audience: 'hu-to-uk' });
    expect(huFaqs.length).toBeGreaterThan(0);
    expect(huFaqs.every(faq => faq.locale === 'hu')).toBe(true);
    expect(huFaqs.every(faq => faq.audience?.includes('hu-to-uk'))).toBe(true);

    // Test English site FAQs (to-hungary)
    const enFaqs = await getFaqs({ locale: 'en', audience: 'to-hungary' });
    expect(enFaqs.length).toBeGreaterThan(0);
    expect(enFaqs.every(faq => faq.locale === 'en')).toBe(true);
    expect(enFaqs.every(faq => faq.audience?.includes('to-hungary'))).toBe(true);
  });
});
