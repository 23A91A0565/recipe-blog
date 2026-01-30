import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface NewsletterFormProps {
  className?: string;
}


export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setShowError(true);
      setShowSuccess(false);
      return;
    }

    setShowSuccess(true);
    setShowError(false);
    setEmail('');
  };

  return (
    <div className={`bg-blue-100 p-6 rounded-lg ${className}`}>
      {!showSuccess ? (
        <>
          <h3 className="text-2xl font-bold mb-2">{t('newsletter') as string}</h3>
          <p className="text-gray-700 mb-4">{t('subscribe_message') as string}</p>
          <form data-testid="newsletter-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              data-testid="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email') as string}
              className="px-4 py-2 rounded border border-gray-300"
            />
            <button
              type="submit"
              data-testid="newsletter-submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t('subscribe') as string}
            </button>
          </form>
          {showError && (
            <div
              data-testid="newsletter-error"
              className="mt-3 text-red-600 font-semibold"
            >
              {t('invalid_email') as string}
            </div>
          )}
        </>
      ) : (
        <div
          data-testid="newsletter-success"
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-green-600 mb-2">{t('success') as string}</h3>
          <p className="text-green-700">{t('thank_you') as string}</p>
        </div>
      )}
    </div>
  );
}
