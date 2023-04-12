import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/recipes.module.css';
import type { Recipe } from '@/types';
import RecipeCard from '@/components/RecipeCard';
import useLocalStorage from '@/hooks/useLocalStorage';
import useDebounce from '@/hooks/useDebounce';
import { allCuisines } from '@/utils/cuisines';
import { cantarell, nunito } from '@/utils/fonts';

async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=50&sort=popularity&sortDirection=desc`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return { props: { initialRecipes: data.results } };
}

export default function Home({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [search, setSearch] = useLocalStorage<string>('search', '');
  const [cuisines, setCuisines] = useLocalStorage<string[]>('cuisines', []);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/complexSearch?apiKey=${
            process.env.NEXT_PUBLIC_API_KEY_2
          }&query=${debouncedSearch}&cuisine=${cuisines.join(
            ','
          )}&number=50&sort=popularity&sortDirection=desc`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setRecipes(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, [cuisines, debouncedSearch]);

  const memoizedRecipes = useMemo(() => recipes, [recipes]);

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
        <title>Kitchenette</title>
        <meta
          name="description"
          content="Find recipes with the ingredients you have at home. Track what is about to expire and what you need to buy."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      <main className={`${cantarell.className} ${styles.layout}`}>
        <h1 className={nunito.className}>Kitchenette</h1>

        <section className={styles.search}>
          <label htmlFor="search">What do you want to eat?</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        <section className={styles.cuisines}>
          <fieldset>
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
          {memoizedRecipes?.length > 0 ? (
            memoizedRecipes.map((recipe) => (
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
