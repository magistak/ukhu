import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadGuides } from '@/lib/content';
import { getDictionary, isLocale, buildRoute, type Locale } from '@ukhu/i18n';

interface GuidesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<GuidesDictionary>(locale);
  const guides = await loadGuides(locale);

  return (
    <section style={{ display: 'grid', gap: '1.5rem' }}>
      <header>
        <h1>{dictionary.guides.title}</h1>
      </header>
      {guides.length === 0 ? (
        <p>{dictionary.guides.empty}</p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1rem' }}>
          {guides.map((guide) => (
            <li key={guide.id} style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
              <h2 style={{ marginTop: 0 }}>{guide.title}</h2>
              {guide.excerpt && <p dangerouslySetInnerHTML={{ __html: guide.excerpt }} />}
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                {dictionary.guides.updated}:{' '}
                {guide.updatedAt ? new Date(guide.updatedAt).toLocaleDateString(locale) : '—'}
              </p>
              <Link href={`${buildRoute(locale, 'guides')}/${guide.slug}`}>
                {dictionary.home.readGuide}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type GuidesDictionary = {
  guides: {
    title: string;
    empty: string;
    updated: string;
  };
  home: {
    readGuide: string;
  };
};
