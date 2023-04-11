import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ExtendedRecipe } from '@/types';
import Link from 'next/link';
import styles from '@/styles/Recipe.module.css';
import GlutenFreeIcon from '../../assets/icons/gluten-free.png';
import NoMilkIcon from '../../assets/icons/no-milk.png';
import KetoIcon from '../../assets/icons/keto.png';
import NoEggsIcon from '../../assets/icons/no-eggs.png';
import BreadIcon from '../../assets/icons/bread.png';
import LeafIcon from '../../assets/icons/leaf.png';
import VeganIcon from '../../assets/icons/vegan.png';
import FishIcon from '../../assets/icons/fish.png';
import PaleoIcon from '../../assets/icons/paleo.png';
import OliveOilIcon from '../../assets/icons/olive-oil.png';

interface Diet {
  name: string;
  icon: string;
}

const diets: { [key: string]: Diet } = {
  glutenFree: {
    name: 'gluten free',
    icon: GlutenFreeIcon.src,
  },
  dairyFree: {
    name: 'dairy free',
    icon: NoMilkIcon.src,
  },
  ketogenic: {
    name: 'ketogenic',
    icon: KetoIcon.src,
  },
  lactoOvoVegetarian: {
    name: 'lacto ovo vegetarian',
    icon: LeafIcon.src,
  },
  lactoVegetarian: {
    name: 'lacto vegetarian',
    icon: NoEggsIcon.src,
  },
  ovoVegetarian: {
    name: 'ovo vegetarian',
    icon: NoMilkIcon.src,
  },
  vegan: {
    name: 'vegan',
    icon: VeganIcon.src,
  },
  pescetarian: {
    name: 'pescetarian',
    icon: FishIcon.src,
  },
  paleo: {
    name: 'paleo',
    icon: PaleoIcon.src,
  },
  primal: {
    name: 'primal',
    icon: PaleoIcon.src,
  },
  lowFodMap: {
    name: 'low fodmap',
    icon: OliveOilIcon.src,
  },
  whole30: {
    name: 'whole30',
    icon: BreadIcon.src,
  },
};

// function generated with AI
function toCamelCase(text: string): string {
  return text.replace(/\s(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

const dietIcon = (diet: string) => {
  const dietName = toCamelCase(diet);
  return (
    <img
      src={diets[dietName].icon}
      alt={diets[dietName].name}
      title={diets[dietName].name}
    />
  );
};

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
            <h2>{info.title}</h2>
            <img
              src={info.image}
              alt={info.title}
            />
          </section>

          <section className={styles.info}>
            <section className={styles.diets}>
              <ul>
                {info.diets?.map((diet) => (
                  <li key={diet}>{dietIcon(diet)}</li>
                ))}
              </ul>
            </section>

            <section className={styles.ingredients}>
              {/* todo: servings useState modify qties */}
              <h3>{`Servings: ${info.servings}`}</h3>
              <ul>
                {info.extendedIngredients?.map((ing) => (
                  <li
                    key={`${ing.id}-${ing.original}`}
                    className="neomorphism--inset"
                  >
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_250x250/${ing.image}`}
                      alt={ing.original}
                    />
                    <strong>{ing.nameClean}</strong>
                    <small>{`${ing.amount} ${ing.unit}`}</small>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.instructions}>
              <h4>Instructions:</h4>
              <ol type="1">
                {info.analyzedInstructions?.[0].steps.map((step) => (
                  <li key={step.number}>
                    <p>{step.step}</p>
                    {/* <img
                      src={`https://spoonacular.com/cdn/equipment_250x250/${step.equipment[0]?.image}`}
                    /> */}
                  </li>
                ))}
              </ol>
              <img
                src={info.image}
                alt={info.title}
              />
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
