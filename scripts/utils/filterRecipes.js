import { normalizeInput } from "./normalization.js";
/****************************************************
* DEFINITION DE LA FONCTION FILTRANT LES RECETTES EN FONCTION DE LA LISTE DE TAGS (NORMALISEE)
*****************************************************/
// A noter qu'ici, on prend la liste des tags qui a déjà été normalisée.


export function filterRecipes(recipes, normalizedTags, searchQuery) {
    // Filtrage par normalizedTags
    let filteredRecipes = [];
    if (normalizedTags.length === 0) {
        filteredRecipes = recipes;
    } else {
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let ingredients = recipe.ingredients.map(ingredient => normalizeInput(ingredient.ingredient));
            let appliance = normalizeInput(recipe.appliance);
            let utensils = recipe.ustensils.map(utensil => normalizeInput(utensil));

            let matchIngredients = normalizedTags.every(tag => ingredients.includes(tag));
            let matchAppliance = normalizedTags.includes(appliance);
            let matchUtensils = normalizedTags.every(tag => utensils.includes(tag));

            if (matchIngredients && matchAppliance && matchUtensils) {
                filteredRecipes.push(recipe);
            }
        }
    }

    // Filtrage par searchQuery
    if (searchQuery !== "") {
        let filteredRecipesByQuery = [];
        let normalizedQuery = normalizeInput(searchQuery);
        for (let i = 0; i < filteredRecipes.length; i++) {
            let recipe = filteredRecipes[i];
            let description = normalizeInput(recipe.description);
            let name = normalizeInput(recipe.name);
            let appliance = normalizeInput(recipe.appliance);

            if (description.includes(normalizedQuery) || name.includes(normalizedQuery) || appliance.includes(normalizedQuery)) {
                filteredRecipesByQuery.push(recipe);
            } else {
                let ingredients = recipe.ingredients.map(ingredient => normalizeInput(ingredient.ingredient));
                let utensils = recipe.ustensils.map(utensil => normalizeInput(utensil));

                let matchQuery = ingredients.some(ingredient => ingredient.includes(normalizedQuery)) ||
                                 utensils.some(utensil => utensil.includes(normalizedQuery));

                if (matchQuery) {
                    filteredRecipesByQuery.push(recipe);
                }
            }
        }
        return filteredRecipesByQuery;
    }

    return filteredRecipes;
}


