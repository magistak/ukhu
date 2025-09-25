import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadGuides } from '@/lib/content';
import { getDictionary, isLocale, buildRoute, type Locale } from '@ukhu/i18n';

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
    <div style={{ display: 'grid', gap: 'var(--space-2xl)' }}>
      {/* Professional Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-2xl)',
        color: 'white',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'var(--text-4xl)', 
            fontWeight: 700, 
            marginBottom: 'var(--space-lg)',
            color: 'white',
            lineHeight: 1.1
          }}>
            {dictionary.home.title}
          </h1>
          <p style={{ 
            fontSize: 'var(--text-lg)', 
            marginBottom: 'var(--space-xl)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.6
          }}>
            {dictionary.home.intro}
          </p>
          
          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-xl)',
            flexWrap: 'wrap',
            marginTop: 'var(--space-lg)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>🏛️</div>
              <div style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>{dictionary.home.trustIndicators.official}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>✓</div>
              <div style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>{dictionary.home.trustIndicators.verified}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>🔄</div>
              <div style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>{dictionary.home.trustIndicators.upToDate}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-md)' }}>{dictionary.home.featuredGuides}</h2>
          <p className="text-secondary">{dictionary.home.guidesSubtitle}</p>
        </div>
        
        {guides.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
            <p className="text-secondary">{dictionary.guides.empty}</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {guides.slice(0, 3).map((guide) => (
              <div key={guide.id} className="card">
                <h3 style={{ 
                  margin: '0 0 var(--space-md)',
                  color: 'var(--color-primary-dark)'
                }}>
                  {guide.title}
                </h3>
                {guide.excerpt && (
                  <div 
                    style={{ 
                      marginBottom: 'var(--space-lg)', 
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6
                    }}
                    dangerouslySetInnerHTML={{ __html: guide.excerpt }} 
                  />
                )}
                <Link 
                  href={buildRoute(locale, 'guides') + `/${guide.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    color: 'var(--color-primary)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: 'var(--space-sm) 0',
                    borderTop: '2px solid var(--color-border)',
                    marginTop: 'auto',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {dictionary.home.readGuide} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section className="card" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        textAlign: 'center',
        padding: 'var(--space-2xl)'
      }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>{dictionary.home.cta.title}</h3>
        <p style={{ marginBottom: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
          {dictionary.home.cta.subtitle}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href={buildRoute(locale, 'guides')}
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            {dictionary.home.cta.browseGuides}
          </Link>
          <Link 
            href={buildRoute(locale, 'contact')}
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
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
