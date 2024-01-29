export function updateRecipeCountElement(recipes) {
    const recipeCountElement = document.querySelector('.RecipeCount');   
    
    const totalRecipeCountText = `${recipes.length} ${recipes.length === 1 ? 'Recette' : 'Recettes'}`;
    console.log('les deux recettes sont: ',recipes)
    recipeCountElement.textContent = totalRecipeCountText;
}