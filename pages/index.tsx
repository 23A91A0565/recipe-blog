import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import NewsletterForm from '../components/NewsletterForm';
import cmsService from '../lib/cmsService';


interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  cookingTime: number;
  cuisine: string;
  featured: boolean;
}

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  return (
    <Layout
      title={t('featured_recipes') as string}
      description="Discover our featured recipes from around the world"
      canonicalUrl={`https://recipe-blog.com/${locale}`}
      locale={locale}
    >
      <div>
        <h1 className="text-4xl font-bold mb-8">{t('featured_recipes') as string}</h1>
        <div data-testid="featured-recipes" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} locale={locale} />
            ))
          ) : (
            <p>{t('no_recipes_found') as string}</p>
          )}
        </div>
        <NewsletterForm className="mt-12" />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  try {
    const recipes = await cmsService.getFeaturedRecipes(locale);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        recipes,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching featured recipes:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        recipes: [],
      },
      revalidate: 10,
    };
  }
};
