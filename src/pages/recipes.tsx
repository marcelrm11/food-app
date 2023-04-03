import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/recipes.module.css';
import type { Recipe } from '@/types';
import RecipeCard from '@/components/RecipeCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${debouncedSearch}`,
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
  }, [debouncedSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

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
      <main className={`${inter.className} ${styles.layout}`}>
        <h1>My Food App</h1>
        <section className={styles.search}>
          <label htmlFor="search">What do you want to eat?</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        <article className={styles.grid}>
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
