import axios from 'axios';


const MOCK_RECIPES = {
  en: [
    {
      id: '1',
      slug: 'classic-spanish-paella',
      title: 'Classic Spanish Paella',
      description: 'A traditional Spanish paella with saffron, vegetables, and seafood',
      featured: true,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561482?w=800',
      cuisine: 'Spanish',
      difficulty: 'Medium',
      cookingTime: 45,
      ingredients: [
        'Saffron strands',
        'Short-grain rice',
        'Seafood (shrimp, mussels, clams)',
        'Bell peppers',
        'Onions',
        'Garlic',
        'Tomatoes',
        'Vegetable broth',
        'White wine',
        'Olive oil',
        'Salt and pepper'
      ],
      instructions: [
        'Heat olive oil in a large paella pan',
        'Sauté onions and garlic until fragrant',
        'Add bell peppers and tomatoes',
        'Toast the rice for 2 minutes',
        'Pour in broth and white wine',
        'Add saffron and let simmer',
        'Add seafood and vegetables',
        'Cook until rice is tender and liquid is absorbed',
        'Rest for 5 minutes before serving'
      ],
      tags: ['Spanish', 'Seafood', 'Dinner'],
      comments: []
    },
    {
      id: '2',
      slug: 'chocolate-chip-cookies',
      title: 'Classic Chocolate Chip Cookies',
      description: 'Soft and chewy chocolate chip cookies',
      featured: true,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
      cuisine: 'American',
      difficulty: 'Easy',
      cookingTime: 25,
      ingredients: [
        'Butter',
        'Brown sugar',
        'Granulated sugar',
        'Eggs',
        'Vanilla extract',
        'All-purpose flour',
        'Baking soda',
        'Salt',
        'Chocolate chips'
      ],
      instructions: [
        'Cream together butter and sugars',
        'Beat in eggs and vanilla',
        'Mix flour, baking soda, and salt',
        'Combine wet and dry ingredients',
        'Fold in chocolate chips',
        'Drop spoonfuls onto baking sheet',
        'Bake at 375°F for 10-12 minutes',
        'Cool on wire rack'
      ],
      tags: ['Dessert', 'Baking', 'American'],
      comments: []
    },
    {
      id: '3',
      slug: 'thai-green-curry',
      title: 'Thai Green Curry',
      description: 'Aromatic Thai green curry with chicken and vegetables',
      featured: false,
      image: 'https://images.unsplash.com/photo-1455521458201-cd3000315e2f?w=800',
      cuisine: 'Thai',
      difficulty: 'Medium',
      cookingTime: 30,
      ingredients: [
        'Green curry paste',
        'Coconut milk',
        'Chicken breast',
        'Green beans',
        'Thai basil',
        'Fish sauce',
        'Palm sugar',
        'Lime juice',
        'Garlic',
        'Ginger'
      ],
      instructions: [
        'Heat coconut milk in a pan',
        'Add green curry paste and stir',
        'Add chicken and simmer',
        'Add vegetables and cook',
        'Season with fish sauce and sugar',
        'Add lime juice and basil',
        'Simmer until chicken is cooked',
        'Serve over rice'
      ],
      tags: ['Thai', 'Curry', 'Chicken', 'Dinner'],
      comments: []
    },
    {
      id: '4',
      slug: 'margherita-pizza',
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with fresh mozzarella and basil',
      featured: true,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800',
      cuisine: 'Italian',
      difficulty: 'Medium',
      cookingTime: 20,
      ingredients: [
        'Pizza dough',
        'Tomato sauce',
        'Fresh mozzarella',
        'Fresh basil',
        'Olive oil',
        'Salt',
        'Pepper'
      ],
      instructions: [
        'Roll out pizza dough',
        'Spread tomato sauce',
        'Add mozzarella cheese',
        'Bake at 475°F for 12-15 minutes',
        'Top with fresh basil',
        'Drizzle with olive oil',
        'Season with salt and pepper'
      ],
      tags: ['Italian', 'Pizza', 'Vegetarian'],
      comments: []
    },
    {
      id: '5',
      slug: 'beef-tacos',
      title: 'Beef Tacos',
      description: 'Delicious Mexican-style beef tacos',
      featured: false,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      cuisine: 'Mexican',
      difficulty: 'Easy',
      cookingTime: 20,
      ingredients: [
        'Ground beef',
        'Taco shells',
        'Lettuce',
        'Tomato',
        'Cheddar cheese',
        'Sour cream',
        'Salsa',
        'Onion',
        'Garlic',
        'Taco seasoning'
      ],
      instructions: [
        'Brown ground beef in a pan',
        'Add onion and garlic',
        'Mix in taco seasoning and water',
        'Simmer for 10 minutes',
        'Warm taco shells',
        'Fill shells with beef',
        'Top with lettuce, tomato, and cheese',
        'Serve with sour cream and salsa'
      ],
      tags: ['Mexican', 'Beef', 'Dinner'],
      comments: []
    }
  ],
  es: [
    {
      id: '1',
      slug: 'classic-spanish-paella',
      title: 'Paella Española Clásica',
      description: 'Una paella española tradicional con azafrán, verduras y mariscos',
      featured: true,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561482?w=800',
      cuisine: 'Española',
      difficulty: 'Medio',
      cookingTime: 45,
      ingredients: [
        'Hebras de azafrán',
        'Arroz de grano corto',
        'Mariscos (camarones, mejillones, almejas)',
        'Pimientos',
        'Cebollas',
        'Ajo',
        'Tomates',
        'Caldo de verduras',
        'Vino blanco',
        'Aceite de oliva',
        'Sal y pimienta'
      ],
      instructions: [
        'Calentar aceite de oliva en una paellera',
        'Saltear cebollas y ajo hasta aromatizar',
        'Agregar pimientos y tomates',
        'Tostar el arroz por 2 minutos',
        'Verter caldo y vino blanco',
        'Añadir azafrán y dejar simmer',
        'Agregar mariscos y verduras',
        'Cocinar hasta que el arroz esté tierno',
        'Reposar 5 minutos antes de servir'
      ],
      tags: ['Española', 'Mariscos', 'Cena'],
      comments: []
    },
    {
      id: '4',
      slug: 'margherita-pizza',
      title: 'Pizza Margherita',
      description: 'Pizza italiana clásica con mozzarella fresca y albahaca',
      featured: true,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800',
      cuisine: 'Italiana',
      difficulty: 'Medio',
      cookingTime: 20,
      ingredients: [
        'Masa de pizza',
        'Salsa de tomate',
        'Mozzarella fresca',
        'Albahaca fresca',
        'Aceite de oliva',
        'Sal',
        'Pimienta'
      ],
      instructions: [
        'Extender la masa de pizza',
        'Esparcir salsa de tomate',
        'Agregar queso mozzarella',
        'Hornear a 475°F por 12-15 minutos',
        'Colocar albahaca fresca encima',
        'Rociar con aceite de oliva',
        'Sazonar con sal y pimienta'
      ],
      tags: ['Italiana', 'Pizza', 'Vegetariana'],
      comments: []
    },
    {
      id: '5',
      slug: 'beef-tacos',
      title: 'Tacos de Carne',
      description: 'Deliciosos tacos mexicanos de carne',
      featured: false,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      cuisine: 'Mexicana',
      difficulty: 'Fácil',
      cookingTime: 20,
      ingredients: [
        'Carne molida',
        'Tortillas',
        'Lechuga',
        'Tomate',
        'Queso cheddar',
        'Crema agria',
        'Salsa',
        'Cebolla',
        'Ajo',
        'Condimento para tacos'
      ],
      instructions: [
        'Dorar la carne molida en una sartén',
        'Agregar cebolla y ajo',
        'Mezclar condimento y agua',
        'Cocinar a fuego lento por 10 minutos',
        'Calentar tortillas',
        'Rellenar con carne',
        'Agregar lechuga, tomate y queso',
        'Servir con crema agria y salsa'
      ],
      tags: ['Mexicana', 'Carne', 'Cena'],
      comments: []
    }
  ],
  fr: [
    {
      id: '1',
      slug: 'classic-spanish-paella',
      title: 'Paella Espagnole Classique',
      description: 'Une paella espagnole traditionnelle avec du safran, des légumes et des fruits de mer',
      featured: true,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561482?w=800',
      cuisine: 'Espagnole',
      difficulty: 'Moyen',
      cookingTime: 45,
      ingredients: [
        'Brins de safran',
        'Riz à grain court',
        'Fruits de mer (crevettes, moules, palourdes)',
        'Poivrons',
        'Oignons',
        'Ail',
        'Tomates',
        'Bouillon de légumes',
        'Vin blanc',
        'Huile d\'olive',
        'Sel et poivre'
      ],
      instructions: [
        'Chauffer l\'huile d\'olive dans une paellera',
        'Faire sauté les oignons et l\'ail',
        'Ajouter les poivrons et les tomates',
        'Faire griller le riz pendant 2 minutes',
        'Verser le bouillon et le vin blanc',
        'Ajouter le safran et laisser mijoter',
        'Ajouter les fruits de mer et les légumes',
        'Cuire jusqu\'à ce que le riz soit tendre',
        'Reposer 5 minutes avant de servir'
      ],
      tags: ['Espagnole', 'Fruits de mer', 'Dîner'],
      comments: []
    },
    {
      id: '2',
      slug: 'chocolate-chip-cookies',
      title: 'Biscuits aux Pépites de Chocolat',
      description: 'Biscuits moelleux et moelleux aux pépites de chocolat',
      featured: true,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
      cuisine: 'Américaine',
      difficulty: 'Facile',
      cookingTime: 25,
      ingredients: [
        'Beurre',
        'Sucre brun',
        'Sucre cristallisé',
        'Œufs',
        'Extrait de vanille',
        'Farine tout usage',
        'Bicarbonate de soude',
        'Sel',
        'Pépites de chocolat'
      ],
      instructions: [
        'Crémer le beurre et les sucres',
        'Battre les œufs et la vanille',
        'Mélanger la farine, le bicarbonate et le sel',
        'Combiner les ingrédients humides et secs',
        'Incorporer les pépites de chocolat',
        'Déposer sur une plaque de cuisson',
        'Cuire à 375°F pendant 10-12 minutes',
        'Refroidir sur une grille'
      ],
      tags: ['Dessert', 'Pâtisserie', 'Américaine'],
      comments: []
    }
  ]
};

class CMSService {
  async getRecipes(locale: string = 'en') {
    try {
      const recipes = MOCK_RECIPES[locale as keyof typeof MOCK_RECIPES] || MOCK_RECIPES['en'];
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  async getRecipeBySlug(slug: string, locale: string = 'en') {
    try {
      const recipes = MOCK_RECIPES[locale as keyof typeof MOCK_RECIPES] || MOCK_RECIPES['en'];
      const recipe = recipes.find(r => r.slug === slug);
      if (!recipe) {
        return null;
      }
      return recipe;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }

  async getFeaturedRecipes(locale: string = 'en') {
    try {
      const recipes = MOCK_RECIPES[locale as keyof typeof MOCK_RECIPES] || MOCK_RECIPES['en'];
      return recipes.filter(r => r.featured);
    } catch (error) {
      console.error('Error fetching featured recipes:', error);
      throw error;
    }
  }

  async getRecipeCategories(locale: string = 'en') {
    try {
      const recipes = MOCK_RECIPES[locale as keyof typeof MOCK_RECIPES] || MOCK_RECIPES['en'];
      const categories = [...new Set(recipes.map(r => r.cuisine))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getRecipeSlugs(locale: string = 'en') {
    try {
      const recipes = MOCK_RECIPES[locale as keyof typeof MOCK_RECIPES] || MOCK_RECIPES['en'];
      return recipes.map(r => r.slug);
    } catch (error) {
      console.error('Error fetching recipe slugs:', error);
      throw error;
    }
  }

  async getAllRecipeSlugs() {
    try {
      const locales = ['en', 'es', 'fr'];
      const slugsByLocale: { [key: string]: string[] } = {};
      for (const locale of locales) {
        slugsByLocale[locale] = await this.getRecipeSlugs(locale);
      }
      return slugsByLocale;
    } catch (error) {
      console.error('Error fetching all recipe slugs:', error);
      throw error;
    }
  }

  async getAllRecipes(locale: string = 'en') {
    try {
      const recipes = MOCK_RECIPES[locale as keyof typeof MOCK_RECIPES] || MOCK_RECIPES['en'];
      return recipes;
    } catch (error) {
      console.error('Error fetching all recipes:', error);
      throw error;
    }
  }
}

export default new CMSService();
