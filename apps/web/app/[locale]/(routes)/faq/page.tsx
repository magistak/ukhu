import { notFound } from 'next/navigation';
import { loadFaqs } from '@/lib/content';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface FaqPageProps {
  params: { locale: string };
}

export default async function FaqPage({ params }: FaqPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = await getDictionary<FaqDictionary>(locale);
  const faqs = await loadFaqs(locale);

  return (
    <section style={{ display: 'grid', gap: '1rem' }}>
      <h1>{dictionary.faq.title}</h1>
      {faqs.length === 0 ? (
        <p>{dictionary.faq.empty}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
          {faqs.map((faq) => (
            <li key={faq.id} style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
              <h2 style={{ marginTop: 0 }}>{faq.question}</h2>
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type FaqDictionary = {
  faq: {
    title: string;
    empty: string;
  };
};
