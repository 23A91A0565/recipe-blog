import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 no-print">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 {t('recipes') as string} {t('home') as string}. All rights reserved.</p>
      </div>
    </footer>
  );
}
