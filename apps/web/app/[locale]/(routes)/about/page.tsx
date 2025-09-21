import { notFound } from 'next/navigation';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface AboutPageProps {
  params: { locale: string };
}

export default async function AboutPage({ params }: AboutPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
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
