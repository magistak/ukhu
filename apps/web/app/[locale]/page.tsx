import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadGuides } from '@/lib/content';
import { getDictionary, isLocale, buildRoute, type Locale } from '@ukhu/i18n';

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params }: HomePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = await getDictionary<HomeDictionary>(locale);
  const guides = await loadGuides(locale);

  return (
    <section style={{ display: 'grid', gap: '2rem' }}>
      <header>
        <h1>{dictionary.home.title}</h1>
        <p>{dictionary.home.intro}</p>
      </header>

      <section>
        <h2>{dictionary.home.featuredGuides}</h2>
        {guides.length === 0 ? (
          <p>{dictionary.guides.empty}</p>
        ) : (
          <ul style={{ display: 'grid', gap: '1rem', listStyle: 'none', padding: 0 }}>
            {guides.slice(0, 3).map((guide) => (
              <li key={guide.id} style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem' }}>{guide.title}</h3>
                {guide.excerpt && <p dangerouslySetInnerHTML={{ __html: guide.excerpt }} />}
                <Link href={buildRoute(locale, 'guides') + `/${guide.slug}`}>
                  {dictionary.home.readGuide}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

type HomeDictionary = {
  home: {
    title: string;
    intro: string;
    featuredGuides: string;
    readGuide: string;
  };
  guides: {
    empty: string;
  };
};
