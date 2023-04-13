import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ExtendedRecipe } from '@/types';
import Link from 'next/link';
import styles from '@/styles/Recipe.module.css';
import ServingsIcon from '../../assets/icons/servings.png';
import ClockIcon from '../../assets/icons/clock.png';
import LikeIcon from '../../assets/icons/heart.png';
import { diets } from '@/utils/diets';
import { cantarell, nunito, ubuntu } from '@/utils/fonts';

// function generated with AI
function toCamelCase(text: string): string {
  return text.replace(/\s(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

interface DietIconProps {
  diet: string;
}

const DietIcon = ({ diet }: DietIconProps) => {
  const dietName = toCamelCase(diet);
  return (
    <picture>
      <img
        src={diets[dietName].icon}
        alt={diets[dietName].name}
        title={diets[dietName].name}
        className={styles.icon}
      />
    </picture>
  );
};

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const [info, setInfo] = useState<ExtendedRecipe | null>(null);

  // fetch recipe info from API
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
    <article className={`${styles.article} ${cantarell.className}`}>
      {/* back button when loading fails */}
      {!info && (
        <Link href="/">
          <button
            type="button"
            className={styles.backButton}
          >
            Back
          </button>
        </Link>
      )}

      {info && (
        <>
          {/* header with back button, picture and title */}
          <section className={styles.header}>
            <Link href="/">
              <button
                type="button"
                className={styles.backButton}
              >
                Back
              </button>
            </Link>
            <h1 className={nunito.className}>{info.title}</h1>
            <picture>
              <img
                src={info.image}
                alt={info.title}
              />
            </picture>
          </section>

          {/* special diets info */}
          <section className={styles.info}>
            <section className={styles.facts}>
              {info.diets?.length > 0 && (
                <section className={styles.diets}>
                  <ul>
                    {info.diets?.map((diet) => (
                      <li key={diet}>
                        <DietIcon diet={diet} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* servings info */}
              <section className={styles.servings}>
                <picture>
                  <img
                    src={ServingsIcon.src}
                    alt={`Servings: ${info.servings}`}
                    title="servings"
                    className={styles.icon}
                  />
                </picture>
                <strong>{info.servings}</strong>
              </section>

              {/* preparation time info */}
              <section className={styles.time}>
                <picture>
                  <img
                    src={ClockIcon.src}
                    alt={`Time: ${info.readyInMinutes} minutes`}
                    title="time"
                    className={styles.icon}
                  />
                </picture>
                <strong>{info.readyInMinutes} minutes</strong>
              </section>

              {/* number of likes */}
              <section className={styles.likes}>
                <picture>
                  <img
                    src={LikeIcon.src}
                    alt={`Time: ${info.aggregateLikes} likes`}
                    title="likes"
                    className={styles.icon}
                  />
                </picture>
                <strong>{info.aggregateLikes}</strong>
              </section>
            </section>

            <hr />

            {/* ingredients info */}
            <section className={styles.ingredients}>
              <h2 className={ubuntu.className}>Ingredients</h2>
              <ul>
                {info.extendedIngredients?.map((ing) => (
                  <li key={`${ing.id}-${ing.original}`}>
                    <picture>
                      <img
                        src={`https://spoonacular.com/cdn/ingredients_250x250/${ing.image}`}
                        alt={ing.original}
                      />
                    </picture>
                    <span>{ing.nameClean?.toUpperCase()}</span>
                    <small>{`${ing.amount} ${ing.unit}`}</small>
                  </li>
                ))}
              </ul>
            </section>

            {/* instructions info */}
            <section className={styles.instructions}>
              {info.analyzedInstructions?.length > 0 && (
                <>
                  <h2 className={ubuntu.className}>Instructions</h2>
                  <ol type="1">
                    {info.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number}>
                        <p>{step.step}</p>
                      </li>
                    ))}
                  </ol>
                </>
              )}
              <div>
                <picture>
                  <img
                    src={info.image}
                    alt={info.title}
                  />
                </picture>
              </div>
            </section>

            {/* wine pairings info */}
            <section className={styles.pairings}>
              {info.winePairing?.pairedWines?.length > 0 && (
                <>
                  <h2 className={ubuntu.className}>Pairings</h2>
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
