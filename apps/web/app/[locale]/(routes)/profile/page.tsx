import { notFound } from 'next/navigation';
import { ProfileClient } from '@/components/profile-client';
import { getDictionary, isLocale, type Locale } from '@ukhu/i18n';

interface ProfilePageProps {
  params: { locale: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dictionary = await getDictionary<ProfileDictionary>(locale);

  return (
    <section style={{ display: 'grid', gap: '1.5rem' }}>
      <header>
        <h1>{dictionary.profile.title}</h1>
        <p>{dictionary.profile.intro}</p>
      </header>
      <ProfileClient
        labels={{
          title: dictionary.profile.title,
          intro: dictionary.profile.intro,
          email: dictionary.profile.email,
          password: dictionary.profile.password,
          signin: dictionary.profile.signin,
          signout: dictionary.profile.signout,
          signup: dictionary.profile.signup,
          reset: dictionary.profile.reset,
          resetHint: dictionary.profile.resetHint,
          cancel: dictionary.profile.cancel,
          success: dictionary.profile.success,
          error: dictionary.profile.error
        }}
      />
    </section>
  );
}

type ProfileDictionary = {
  profile: {
    title: string;
    intro: string;
    email: string;
    password: string;
    signin: string;
    signout: string;
    signup: string;
    reset: string;
    resetHint: string;
    cancel: string;
    success: string;
    error: string;
  };
};
