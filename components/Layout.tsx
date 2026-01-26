import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  locale?: string;
}

export default function Layout({
  children,
  title = 'Recipe Blog',
  description = 'A multi-language recipe blog',
  canonicalUrl,
  locale = 'en',
}: LayoutProps) {
  const fullUrl = canonicalUrl || 'https://recipe-blog.com';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <link rel="alternate" hrefLang="en" href={fullUrl.replace(/\/(es|fr)\//, '/en/')} />
        <link rel="alternate" hrefLang="es" href={fullUrl.replace(/\/(en|fr)\//, '/es/')} />
        <link rel="alternate" hrefLang="fr" href={fullUrl.replace(/\/(en|es)\//, '/fr/')} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
