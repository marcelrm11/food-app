import Link from 'next/link';
import React from 'react';
import styles from '@/styles/RecipeCard.module.css';
import Image from 'next/image';

interface RecipeCardProps {
  id: number;
  image: string;
  title: string;
}

export default function RecipeCard({ id, image, title }: RecipeCardProps) {
  return (
    <section className={styles.card}>
      <Link href={`/recipes/${id}`}>
        <Image
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
