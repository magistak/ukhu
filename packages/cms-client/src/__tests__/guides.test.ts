import { describe, expect, it } from 'vitest';
import { buildGuidesEndpoint } from '@ukhu/cms-client';

describe('cms client', () => {
  it('builds guides endpoint with filters', () => {
    const url = buildGuidesEndpoint('https://cms.example', {
      locale: 'hu',
      topic: 'housing',
      audience: 'family',
      page: 2
    });

    expect(url).toContain('wp-json/wp/v2/guides');
    expect(url).toContain('lang=hu');
    expect(url).toContain('topic=housing');
    expect(url).toContain('audience=family');
    expect(url).toContain('page=2');
  });
});
