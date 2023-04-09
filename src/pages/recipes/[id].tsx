import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ExtendedRecipe } from '@/types';
import Link from 'next/link';
import styles from '@/styles/Recipe.module.css';

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const [info, setInfo] = useState<ExtendedRecipe | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log('recipe info:', data);
      setInfo(data);
    };
    fetchInfo();
  }, [id]);

  return (
    <article>
      <Link href="/recipes">
        <button
          type="button"
          style={{ width: '200px', height: '50px' }}
        >
          Back
        </button>
      </Link>

      {info && (
        <>
          <h2>{info.title}</h2>
          <section className={styles.info}>
            <img
              src={info.image}
              alt={info.title}
              width="375px"
            />

            <section className={styles.ingredients}>
              <h4>Ingredients:</h4>
              <ul>
                {info.extendedIngredients?.map((ing) => (
                  <li key={`${ing.id}-${ing.original}`}>
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_250x250/${ing.image}`}
                      alt={ing.original}
                    />
                    <strong>{ing.original}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4>Diets:</h4>
              <p>{info.diets?.join(', ')}</p>
            </section>

            <section>
              <h4>Instructions:</h4>
              <ol type="1">
                {info.analyzedInstructions?.[0].steps.map((step) => (
                  <li key={step.number}>
                    <p>{step.step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              {info.winePairing?.pairedWines.length > 0 && (
                <>
                  <h4>Pairings:</h4>
                  <p>{info.winePairing?.pairingText}</p>
                </>
              )}
            </section>
          </section>
        </>
      )}
    </article>
  );
}
