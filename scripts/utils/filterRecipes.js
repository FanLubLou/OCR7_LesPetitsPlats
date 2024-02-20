import { normalizeInput } from "./normalization.js";
/****************************************************
* DEFINITION DE LA FONCTION FILTRANT LES RECETTES EN FONCTION DE LA LISTE DE TAGS (NORMALISEE)
*****************************************************/
// A noter qu'ici, on prend la liste des tags qui a déjà été normalisée.


export function filterRecipes(recipes, normalizedTags, searchQuery) {
    if (normalizedTags.length === 0 && !searchQuery) {
        return recipes;
    }

    const filteredRecipes = recipes.filter(recipe => {
        const containsAllTags = normalizedTags.every(tag => (
            normalizeInput(recipe.appliance).includes(tag) ||
            recipe.ustensils.some(ustensil => normalizeInput(ustensil).includes(tag)) ||
            recipe.ingredients.some(ingredient => normalizeInput(ingredient.ingredient).includes(tag))
        ));

        const containsSearchQuery = (
            !searchQuery || // Si la recherche est vide, on considère que la recette passe la recherche
            normalizeInput(recipe.name).includes(searchQuery) ||
            normalizeInput(recipe.appliance).includes(searchQuery) ||
            recipe.ustensils.some(ustensil => normalizeInput(ustensil).includes(searchQuery)) ||
            recipe.ingredients.some(ingredient => normalizeInput(ingredient.ingredient).includes(searchQuery)) ||
            normalizeInput(recipe.description).includes(searchQuery) 
        );

        return containsAllTags && containsSearchQuery;
    });

    return filteredRecipes;
}