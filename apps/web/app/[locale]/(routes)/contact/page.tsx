import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/contact-form';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface ContactPageProps {
  params: { locale: string };
}

export default async function ContactPage({ params }: ContactPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
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
          name: dictionary.contact.fields.name,
          email: dictionary.contact.fields.email,
          message: dictionary.contact.fields.message,
          submit: dictionary.contact.submit,
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
    intro: string;
    fields: {
      name: string;
      email: string;
      message: string;
    };
    submit: string;
    success: string;
    error: string;
  };
};
