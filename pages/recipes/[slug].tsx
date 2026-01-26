import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import Layout from '../../components/Layout';
import NewsletterForm from '../../components/NewsletterForm';
import cmsService from '../../lib/cmsService';

interface RecipeDetailProps {
  recipe: any;
  locale: string;
}

export default function RecipeDetail({ recipe, locale }: RecipeDetailProps) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  if (!recipe) {
    return (
      <Layout title="Recipe Not Found" description="The recipe you're looking for doesn't exist" locale={locale}>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">404 - {t('no_recipes_found') as string}</h1>
          <Link href="/recipes" className="text-blue-600 hover:underline">
            {t('back_to_recipes') as string}
          </Link>
        </div>
      </Layout>
    );
  }

  const currentUrl = `https://recipe-blog.com/${locale}/recipes/${recipe.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this recipe: ${recipe.title}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  return (
    <Layout
      title={recipe.title}
      description={recipe.description}
      canonicalUrl={currentUrl}
      locale={locale}
    >
      <div className="max-w-4xl mx-auto">
        <Link href="/recipes" className="text-blue-600 hover:underline mb-4 block">
          ← {t('back_to_recipes') as string}
        </Link>

        <article>
          <h1 data-testid="recipe-title" className="text-4xl font-bold mb-4">
            {recipe.title}
          </h1>

          <div className="flex gap-6 mb-6 text-gray-600">
            <span>{recipe.cuisine}</span>
            <span>{recipe.difficulty}</span>
            <span>{recipe.cookingTime} {t('minutes') as string}</span>
          </div>

          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            {imageError ? (
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-2">🍽️</div>
                <p className="text-lg">Recipe Image</p>
              </div>
            ) : (
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                onError={() => setImageError(true)}
                unoptimized
              />
            )}
          </div>

          <p className="text-lg text-gray-700 mb-8">{recipe.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 data-testid="recipe-ingredients" className="text-2xl font-bold mb-4">
                {t('ingredients') as string}
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{t('instructions') as string}</h2>
              <div data-testid="recipe-instructions" className="space-y-3">
                {recipe.instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex gap-3">
                    <span className="font-bold text-blue-600 flex-shrink-0">
                      {index + 1}.
                    </span>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-8">
            <h3 className="text-2xl font-bold mb-4">{t('share') as string}</h3>
            <div className="flex gap-4">
              <a
                data-testid="social-share-twitter"
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Twitter
              </a>
              <a
                data-testid="social-share-facebook"
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Facebook
              </a>
              <button
                onClick={() => window.print()}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                {t('print') as string}
              </button>
            </div>
          </div>

          <div data-testid="comments-list" className="mt-8 border-t pt-6">
            <h3 className="text-2xl font-bold mb-4">{t('comments') as string}</h3>
            {recipe.comments && recipe.comments.length > 0 ? (
              <div className="space-y-4">
                {recipe.comments.map((comment: any, index: number) => (
                  <div key={index} className="bg-gray-100 p-4 rounded">
                    <p className="font-bold">{comment.author}</p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">{t('no_comments') as string}</p>
            )}
          </div>
        </article>

        <NewsletterForm className="mt-12" />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'es', 'fr'];
  const paths = [];

  for (const locale of locales) {
    try {
      const recipes = await cmsService.getAllRecipes(locale);
      const localePaths = recipes.map((recipe) => ({
        params: { slug: recipe.slug },
        locale,
      }));
      paths.push(...localePaths);
    } catch (error) {
      console.error(`Error fetching recipes for locale ${locale}:`, error);
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  try {
    const slug = params?.slug as string;
    const recipe = await cmsService.getRecipeBySlug(slug, locale);

    if (!recipe) {
      return { notFound: true };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale)),
        recipe,
        locale,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return { notFound: true };
  }
};
