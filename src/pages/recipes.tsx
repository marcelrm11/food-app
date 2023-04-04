import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/recipes.module.css';
import type { Recipe } from '@/types';
import RecipeCard from '@/components/RecipeCard';

const inter = Inter({ subsets: ['latin'] });

const allCuisines = [
  'african',
  'american',
  'british',
  'cajun',
  'caribbean',
  'chinese',
  'eastern european',
  'european',
  'french',
  'german',
  'greek',
  'indian',
  'irish',
  'italian',
  'japanese',
  'jewish',
  'korean',
  'latin american',
  'mediterranean',
  'mexican',
  'middle eastern',
  'nordic',
  'southern',
  'spanish',
  'thai',
  'vietnamese',
];

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [cuisines, setCuisines] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }&query=${debouncedSearch}&cuisine=${cuisines.join(',')}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setRecipes(data.results);
    };
    fetchRecipes();
  }, [cuisines, debouncedSearch]);

  // see useDebounce in docs.md
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setCuisines((prevCuisines) => [...prevCuisines, name]);
    } else {
      setCuisines((prevCuisines) =>
        prevCuisines.filter((cuisine) => cuisine !== name)
      );
    }
  };

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

        <section>
          <fieldset className={styles.cuisines}>
            <legend>Cuisine:</legend>
            {allCuisines.map((cuisine) => (
              <div key={cuisine}>
                <input
                  type="checkbox"
                  name={cuisine}
                  id={cuisine}
                  value={cuisine}
                  onChange={handleCuisineChange}
                  checked={cuisines.includes(cuisine)}
                />
                <label htmlFor={cuisine}>{cuisine}</label>
              </div>
            ))}
          </fieldset>
        </section>

        <article className={styles.grid}>
          {recipes !== undefined && recipes.length > 0 ? (
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
