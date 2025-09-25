import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<AboutDictionary>(locale);

  return (
    <article style={{ display: 'grid', gap: '1rem' }}>
      <h1>{dictionary.about.title}</h1>
      <p>{dictionary.about.body}</p>
    </article>
  );
}

type AboutDictionary = {
  about: {
    title: string;
    body: string;
  };
};
