import React from 'react';
import styles from '@/styles/Aichef.module.css';

// create a react ts component with an input for the user to write ingredients, a button to ask for a recipe name and a space to display 3 possible recipes
export default function Aichef() {
  // ! type any
  const [recipes, setRecipes] = React.useState<any>([]);

  return (
    <div className={styles.layout}>
      <h1>Recipe App</h1>
      <h2>Ingredients</h2>
      <input type="text" />
      <button>Ask for a recipe</button>
      <h2>Recipes</h2>
      <div>
        {!!recipes && recipes.length > 0 ? (
          recipes.map((recipe) => <p key={recipe.title}>{recipe.title}</p>)
        ) : (
          <p>No recipes yet</p>
        )}
      </div>
    </div>
  );
}
