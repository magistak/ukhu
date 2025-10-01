import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadGuides } from '@/lib/content';
import { getDictionary, isLocale, buildRoute, type Locale } from '@ukhu/i18n';
import styles from './home.module.css';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<HomeDictionary>(locale);
  const guides = await loadGuides(locale);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {dictionary.home.title}
          </h1>
          <p className={styles.heroIntro}>
            {dictionary.home.intro}
          </p>
          
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🏛️</div>
              <div className={styles.trustLabel}>{dictionary.home.trustIndicators.official}</div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>✓</div>
              <div className={styles.trustLabel}>{dictionary.home.trustIndicators.verified}</div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🔄</div>
              <div className={styles.trustLabel}>{dictionary.home.trustIndicators.upToDate}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{dictionary.home.featuredGuides}</h2>
          <p className={styles.sectionSubtitle}>{dictionary.home.guidesSubtitle}</p>
        </div>
        
        {guides.length === 0 ? (
          <div className={styles.emptyState}>
            <p className="text-secondary">{dictionary.guides.empty}</p>
          </div>
        ) : (
          <div className={styles.guidesGrid}>
            {guides.slice(0, 3).map((guide) => (
              <div key={guide.id} className={styles.guideCard}>
                <h3 className={styles.guideTitle}>
                  {guide.title}
                </h3>
                {guide.excerpt && (
                  <div 
                    className={styles.guideExcerpt}
                    dangerouslySetInnerHTML={{ __html: guide.excerpt }} 
                  />
                )}
                <Link 
                  href={buildRoute(locale, 'guides') + `/${guide.slug}`}
                  className={styles.guideLink}
                >
                  {dictionary.home.readGuide} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.cta}>
        <h3 className={styles.ctaTitle}>{dictionary.home.cta.title}</h3>
        <p className={styles.ctaSubtitle}>
          {dictionary.home.cta.subtitle}
        </p>
        <div className={styles.ctaButtons}>
          <Link 
            href={buildRoute(locale, 'guides')}
            className="btn-primary"
          >
            {dictionary.home.cta.browseGuides}
          </Link>
          <Link 
            href={buildRoute(locale, 'contact')}
            className="btn-secondary"
          >
            {dictionary.home.cta.getHelp}
          </Link>
        </div>
      </section>
    </div>
  );
}

type HomeDictionary = {
  home: {
    title: string;
    intro: string;
    featuredGuides: string;
    readGuide: string;
    trustIndicators: {
      official: string;
      verified: string;
      upToDate: string;
    };
    guidesSubtitle: string;
    cta: {
      title: string;
      subtitle: string;
      browseGuides: string;
      getHelp: string;
    };
  };
  guides: {
    empty: string;
  };
};
