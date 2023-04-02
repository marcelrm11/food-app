import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
// eslint-disable-next-line import/extensions
import { ShortRecipe } from '../types';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [recipes, setRecipes] = useState<ShortRecipe[]>([]);

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
        <ul>
          {recipes !== undefined &&
            recipes.map((recipe) => (
              <li key={recipe.id}>
                <h4>{recipe.title}</h4>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                />
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}
