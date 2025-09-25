import { notFound } from 'next/navigation';
import { loadGuide } from '@/lib/content';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface GuideDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 60;

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { locale: localeParam, slug } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<GuideDictionary>(locale);
  const guide = await loadGuide(locale, slug);

  if (!guide) {
    notFound();
  }

  return (
    <article style={{ display: 'grid', gap: '1.5rem' }}>
      <header>
        <h1>{guide.title}</h1>
        {guide.updatedAt && (
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            {dictionary.guides.updated}{' '}
            {new Date(guide.updatedAt).toLocaleDateString(locale)}
          </p>
        )}
      </header>
      {guide.content ? (
        <div dangerouslySetInnerHTML={{ __html: guide.content }} />
      ) : (
        <p>{dictionary.guides.empty}</p>
      )}
    </article>
  );
}

type GuideDictionary = {
  guides: {
    updated: string;
    empty: string;
  };
};
