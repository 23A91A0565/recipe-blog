import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'next-i18next';

export default function Header() {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 no-print">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🍳 {t('recipes') as string}
        </Link>
        {mounted && <LanguageSwitcher />}
      </div>
    </header>
  );
}
