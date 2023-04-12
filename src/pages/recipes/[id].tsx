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

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY_2}`,
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
      {!info && (
        <Link href="/recipes">
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
          <section className={styles.header}>
            <Link href="/recipes">
              <button
                type="button"
                className={styles.backButton}
              >
                Back
              </button>
            </Link>
            <h2 className={nunito.className}>{info.title}</h2>
            <picture>
              <img
                src={info.image}
                alt={info.title}
              />
            </picture>
          </section>

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

              {/* todo: servings useState modify qties */}
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

            <section className={styles.ingredients}>
              <h3 className={ubuntu.className}>Ingredients</h3>
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

            <section className={styles.instructions}>
              {info.analyzedInstructions.length > 0 && (
                <>
                  <h3 className={ubuntu.className}>Instructions</h3>
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

            <section className={styles.pairings}>
              {info.winePairing?.pairedWines?.length > 0 && (
                <>
                  <h3 className={ubuntu.className}>Pairings</h3>
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
