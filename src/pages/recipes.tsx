import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import type { Recipe } from '@/types';
import RecipeCard from '@/components/RecipeCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.API_KEY}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRecipes(data.results);
    };
    fetchRecipes();
  }, []);
  return (
    <>
      <Head>
        <title>My Food App</title>
        <meta
          name="description"
          content="Find recipes with the ingredients you have at home. Track what is about to expire and what you need to buy."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <main className={inter.className}>
        <h1>My Food App</h1>
        <article>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
              />
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </article>
      </main>
    </>
  );
}
