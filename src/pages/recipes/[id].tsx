import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ExtendedRecipe } from '@/types';

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const [info, setInfo] = useState<ExtendedRecipe | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.API_KEY}`,
          },
        }
      );
      const data = await response.json();
      console.log('recipe info:', data);
      setInfo(data);
    };
    fetchInfo();
  }, [id]);
  if (info) {
    return (
      <article>
        <h2>{info.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: info.summary }} />
        {/* see note about dangerously(...) in docs file */}
        <img
          src={info.image}
          alt={info.title}
        />
        <h4>Ingredients:</h4>
        <ul>
          {info.extendedIngredients.map((ing) => (
            <li key={ing.id}>
              <h6>{ing.name}</h6>
            </li>
          ))}
        </ul>
        <h4>Diets:</h4>
        <p>{info.diets.join(', ')}</p>
        <h4>Pairings:</h4>
        <p>{info.winePairing.pairingText}</p>
      </article>
    );
  }
}
