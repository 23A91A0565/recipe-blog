import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import RecipeCard from '../../components/RecipeCard';
import NewsletterForm from '../../components/NewsletterForm';
import cmsService from '../../lib/cmsService';

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  cookingTime: number;
  cuisine: string;
}

interface RecipesProps {
  recipes: Recipe[];
  categories: string[];
  locale: string;
}

export default function Recipes({ recipes, categories, locale }: RecipesProps) {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || recipe.cuisine === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchQuery, selectedCategory]);

  return (
    <Layout
      title={t('all_recipes') as string}
      description="Browse our collection of recipes"
      canonicalUrl={`https://recipe-blog.com/${locale}/recipes`}
      locale={locale}
    >
      <div>
        <h1 className="text-4xl font-bold mb-8">{t('all_recipes') as string}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <input
              type="text"
              data-testid="search-input"
              placeholder={t('search_placeholder') as string}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <select
              data-testid="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">{t('all_categories') as string}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} locale={locale} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              {t('no_recipes_found') as string}
            </p>
          )}
        </div>

        <NewsletterForm className="mt-12" />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  try {
    const recipes = await cmsService.getRecipes(locale);
    const categories = await cmsService.getRecipeCategories(locale);

    return {
      props: {
        ...(await serverSideTranslations(locale)),
        recipes,
        categories,
        locale,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale)),
        recipes: [],
        categories: [],
        locale,
      },
      revalidate: 10,
    };
  }
};
