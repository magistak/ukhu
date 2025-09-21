import { describe, expect, it } from 'vitest';
import { buildLocalePath, buildRoute } from '@ukhu/i18n';

describe('i18n paths', () => {
  it('swaps locale segment when present', () => {
    expect(buildLocalePath('hu', '/en/guides/how-to')).toEqual('/hu/guides/how-to');
  });

  it('prefixes locale when missing', () => {
    expect(buildLocalePath('en', '/guides')).toEqual('/en/guides');
  });

  it('builds known routes', () => {
    expect(buildRoute('hu', 'contact')).toEqual('/hu/contact');
  });
});
