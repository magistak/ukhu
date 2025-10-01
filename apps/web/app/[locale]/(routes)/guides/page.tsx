import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadGuides } from '@/lib/content';
import { getDictionary, isLocale, buildRoute, type Locale } from '@ukhu/i18n';
import styles from './guides.module.css';

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
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dictionary.guides.title}</h1>
      </header>
      {guides.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{dictionary.guides.empty}</p>
        </div>
      ) : (
        <ul className={styles.guidesList}>
          {guides.map((guide) => (
            <li key={guide.id} className={styles.guideCard}>
              <h2 className={styles.guideTitle}>{guide.title}</h2>
              {guide.excerpt && (
                <div className={styles.guideExcerpt} dangerouslySetInnerHTML={{ __html: guide.excerpt }} />
              )}
              <p className={styles.guideMeta}>
                {dictionary.guides.updated}:{' '}
                {guide.updatedAt ? new Date(guide.updatedAt).toLocaleDateString(locale) : '—'}
              </p>
              <Link href={`${buildRoute(locale, 'guides')}/${guide.slug}`} className={styles.guideLink}>
                {dictionary.home.readGuide} →
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
