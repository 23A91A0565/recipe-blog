import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    difficulty: string;
    cookingTime: number;
    cuisine: string;
  };
  locale: string;
}

export default function RecipeCard({ recipe, locale }: RecipeCardProps) {
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/${locale}/recipes/${recipe.slug}`}>
      <div
        data-testid="recipe-card"
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
          {imageError ? (
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-sm">Recipe Image</p>
            </div>
          ) : (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              unoptimized
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{recipe.cuisine}</span>
            <span>{recipe.cookingTime} {t('minutes') as string}</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
