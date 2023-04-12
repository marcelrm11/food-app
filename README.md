# Kitchenette

[![CodeFactor](https://www.codefactor.io/repository/github/marcelrm11/food-app/badge)](https://www.codefactor.io/repository/github/marcelrm11/food-app)

## Description

I have a passion for planning and tracking. I need to cook (almost) every day, and sometimes is difficult to find what to cook. It is also difficult to optimize food waste, and countless times I had to throw away food because it had perished.

If only I had a way to keep track of the food I have and get suggestions of what to cook on the spot, or be able to plan the weekly meals ahead, perfectly adapted to the food I have and to my taste...

That's where Kitchenette will make me happy. It will:

- Keep track of my food storage.
- Remind me when something is about to expire.
- Suggest me recipes to cook based on what I have, what I like and when it will expire.
- Help me with meal plans that optimize grocery shopping and health.

## Table of Contents

- [Kitchenette](#kitchenette)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Deploy on Vercel](#deploy-on-vercel)
  - [Usage](#usage)
  - [Spoonacular API](#spoonacular-api)
  - [Views](#views)
  - [Stack](#stack)
  - [Next Steps](#next-steps)
  - [Credits](#credits)
  - [License](#license)
  - [Contact info](#contact-info)

## Installation

```shell
npm install
npm run dev
npm run build
npm run start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Usage

This project uses React hooks to manage the display and different API calls. As we can see in the image below, we use:

- SSR from Next.js to load the initial recipes.
- Custom hooks for localStorage usage and debounced search.
- useEffect for the API calls, with corresponding dependencies.
- useMemo to avoid unnecessary re-renderings and API calls.

![usage example from Home component](./src/assets/screenshots/usage_example.png)

## Spoonacular API

The [Spoonacular API](https://spoonacular.com/food-api/) has a great amount of endpoints, to use with multiple query params. This gives you an endless amount of possible queries and data usages.

## Views

There are two views:

- Home: it shows a list of recipes and has the ability to search using text and filter by cuisine.
- Details: using Next special routing naming ([id]) for dynamic routes. It shows details about a specific recipe.

## Stack

It uses React 18 and Next 13, together with Typescript.
The styles are written using CSS-modules.

## Next Steps

- Adding more filters to recipes search, such as intolerances, unwanted ingredients, type of dish, etc.
- Showing more information about the recipes in the recipe card using icons.
- Adding new features, such as searching with my ingredients, creating shopping cart(s), creating meal plans, storage tracker, expiration reminders...
- Ability for the users to create.
- Integrating AI to create new recipes or plans.
- Adding image recognition to update storage with a simple shopping ticket picture.
- Connect to a database to store all new recipes and plans, created either by users or AI.

And many more!

## Credits

ChatGPT is my main collaborator.

## License

This project uses [GPL-3.0 license](https://spdx.org/licenses/GPL-3.0-or-later.html). See COPYING.txt to see the text.

<!-- ## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here. -->

## Contact info

If you have suggestions or wish to contribute to make this project see the light, please contact me at marcelrm11@gmail.com.
