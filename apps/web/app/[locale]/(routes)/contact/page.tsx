import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/contact-form';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params;
  
  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary<ContactDictionary>(locale);

  return (
    <section style={{ display: 'grid', gap: '1.5rem' }}>
      <header>
        <h1>{dictionary.contact.title}</h1>
        <p>{dictionary.contact.intro}</p>
      </header>
      <ContactForm
        locale={locale}
        labels={{
          formTitle: dictionary.contact.formTitle,
          name: dictionary.contact.fields.name,
          email: dictionary.contact.fields.email,
          message: dictionary.contact.fields.message,
          submit: dictionary.contact.submit,
          submitting: dictionary.contact.submitting,
          success: dictionary.contact.success,
          error: dictionary.contact.error
        }}
      />
    </section>
  );
}

type ContactDictionary = {
  contact: {
    title: string;
    formTitle: string;
    intro: string;
    fields: {
      name: string;
      email: string;
      message: string;
    };
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
};
