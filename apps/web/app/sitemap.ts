import type { MetadataRoute } from 'next';
import { locales } from '@ukhu/i18n';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/guides', '/faq', '/about', '/contact', '/profile'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      const href = path === '/' ? `/${locale}` : `/${locale}${path}`;
      entries.push({ url: `${baseUrl}${href}` });
    }
  }

  return entries;
}
