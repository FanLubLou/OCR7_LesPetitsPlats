import { recipes } from '../../data/recipes.js';
import { recipeRender } from '../components/display.js';


//On affiche les recettes dans la troisième section
recipeRender(recipes);

export const displayRecipesCards = () => {
    recipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const templateCard = new RecipeCard(recipe);
            templateCard.createCard();
        })
};

displayRecipesCards();