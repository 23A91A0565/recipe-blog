import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState('en');
  const [pathname, setPathname] = useState('');
  const [query, setQuery] = useState<any>({});

  useEffect(() => {
    setMounted(true);
    setLocale(router.locale || 'en');
    setPathname(router.pathname);
    setQuery(router.query);
  }, [router.locale, router.pathname, router.query]);

  if (!mounted) {
    return <div className="flex gap-2" data-testid="language-switcher"></div>;
  }

  const locales = ['en', 'es', 'fr'];
  const localeNames: { [key: string]: string } = {
    en: t('english') as string,
    es: t('spanish') as string,
    fr: t('french') as string,
  };

  const getCurrentUrl = (newLocale: string) => {
    const path = pathname.replace(/^\/\w{2}/, `/${newLocale}`);
    return { pathname: path, query };
  };

  return (
    <div data-testid="language-switcher" className="flex gap-2">
      {locales.map((lng) => {
        const { pathname: newPath, query: newQuery } = getCurrentUrl(lng);
        return (
          <Link
            key={lng}
            href={{ pathname: newPath, query: newQuery }}
            locale={lng}
            className={`px-3 py-1 rounded ${
              locale === lng
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {localeNames[lng] || lng.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
