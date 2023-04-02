import Link from 'next/link';
import React from 'react';

interface RecipeCardProps {
  id: number;
  image: string;
  title: string;
}

export default function RecipeCard({ id, image, title }: RecipeCardProps) {
  return (
    <section style={{ width: '400px', border: '1px solid grey' }}>
      <Link href={`/recipes/${id}`}>
        <img
          src={image}
          alt={title}
        />
      </Link>
      <div>
        <h4>{title}</h4>
      </div>
    </section>
  );
}
