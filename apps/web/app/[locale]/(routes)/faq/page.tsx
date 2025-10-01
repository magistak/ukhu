import { notFound } from 'next/navigation';
import { loadFaqs } from '@/lib/content';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';
import styles from './faq.module.css';

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<FaqDictionary>(locale);
  const faqs = await loadFaqs(locale);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{dictionary.faq.title}</h1>
      {faqs.length === 0 ? (
        <p className={styles.emptyState}>{dictionary.faq.empty}</p>
      ) : (
        <ul className={styles.faqList}>
          {faqs.map((faq) => (
            <li key={faq.id} className={styles.faqItem}>
              <h2 className={styles.question}>{faq.question}</h2>
              <div className={styles.answer} dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
