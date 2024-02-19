import { normalizeInput } from "./normalization.js";

/****************************************************
* DEFINITION DE LA FONCTION FILTRANT LES RECETTES EN FONCTION DE LA LISTE DE TAGS (NORMALISEE) 
                - Version avec les boucles natives uniquement
*****************************************************/
// A noter qu'ici, on prend la liste des tags qui a déjà été normalisée.

export function filterRecipes(recipes, normalizedTags, searchQuery) {
    // Cette expression ternaire permet de régler le problème des recettes qui pourraient ne pas avoir d'ingrédient, d'appareil ou d'ustensiles
    // Dans la version utilisée de main, la méthode some() n'applique pas la fonction de rappel aux éléments vides ou 'null'
    function normalizeString(str) {
        return str ? normalizeInput(str) : '';
    }

    // On filtre une première fois par le biais des tags
    let filteredRecipes = [];
    if (normalizedTags.length === 0) {
        filteredRecipes = recipes;
    } else {
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];

        /*********************************************************
        * POUR CHAQUE RECETTE, ON VA CREER LES LISTES D'INGREDIENTS, D'APPAREILS OU D' USTENSILES SOUS FORME DE 3 TABLEAUX
        ********************************************************/            
            //Les 4 lignes suivantes correspondent en tout point à la méthode map suivante
            // let ingredients = recipe.ingredients.map(ingredient => normalizeString(ingredient.ingredient));
            let normalizedIngredients = [];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                normalizedIngredients.push(normalizeString(recipe.ingredients[j].ingredient));
            }
            let normalizedAppliance = normalizeString(recipe.appliance);
            //Les 4 lignes suivantes correspondent en tout point à la méthode map suivante
            // let utensils = recipe.ustensils.map(utensil => normalizeString(utensil));
            let normalizedUstensils = [];
            for (let j = 0; j < recipe.ustensils.length; j++) {
                normalizedUstensils.push(normalizeString(recipe.ustensils[j]));
            }

        /*********************************************************
        * ON CHERCHE ICI A EXCLURE LES RECETTES DONT L'UN DES TAGS DE LA normalizedTagList 
        * N'EST INCLUS NI DANS LES INGREDIENTS NI DANS LES APPAREILS NI DANS LES USTENSILES.
        * POUR LE DIRE AUTREMENT, DES QU'UN TAG N'EST COMPRIS DANS AUCUNE DES TROIS LISTES, NOUS RETIRONS LA RECETTE.
        ********************************************************/
            let allTagsIncluded = true;
            for (let j = 0; j < normalizedTags.length; j++) {
                let tag = normalizedTags[j];
                if (!(normalizedIngredients.some(ingredient => ingredient.includes(tag)) || normalizedAppliance.includes(tag) || normalizedUstensils.some(utensil => utensil.includes(tag)))) {
                    allTagsIncluded = false;
                    break;
                }
            }
            if (allTagsIncluded) {
                filteredRecipes.push(recipe);
            }
        }
    }

    // Filtrage par searchQuery
    if (searchQuery !== "") {
        let normalizedQuery = normalizeString(searchQuery);
        let filteredRecipesByQuery = [];

        for (let i = 0; i < filteredRecipes.length; i++) {
            let recipe = filteredRecipes[i];

        /*********************************************************
        * POUR CHAQUE RECETTE, ON VA CREER LES LISTES D'INGREDIENTS, D'APPAREILS, D' USTENSILES, NOM ET DESCRIPTIONS SOUS FORME DE 5 TABLEAUX
        ********************************************************/

            //Les 4 lignes suivantes correspondent en tout point à la méthode map suivante
            // let ingredients = recipe.ingredients.map(ingredient => normalizeString(ingredient.ingredient));
            let normalizedIngredients = [];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                normalizedIngredients.push(normalizeString(recipe.ingredients[j].ingredient));
            }
            let normalizedAppliance = normalizeString(recipe.appliance);
            //Les 4 lignes suivantes correspondent en tout point à la méthode map suivante
            // let utensils = recipe.ustensils.map(utensil => normalizeString(utensil));
            let normalizedUstensils = [];
            for (let j = 0; j < recipe.ustensils.length; j++) {
                normalizedUstensils.push(normalizeString(recipe.ustensils[j]));
            }
            let description = normalizeString(recipe.description);
            let name = normalizeString(recipe.name);
            

        /*********************************************************
        * Il SUFFIT QUE L'ENTREE DE L'UTILISATEUR CORRESPONDE EN TOUT OU EN PARTIE A L'UN DES TABLEAUX POUR INCLURE LA RECETTE
        * ********************************************************/

            if (description.includes(normalizedQuery) || name.includes(normalizedQuery) || normalizedAppliance.includes(normalizedQuery) || normalizedIngredients.includes(normalizedQuery)|| normalizedUstensils.includes(normalizedQuery)) {
                filteredRecipesByQuery.push(recipe);
            }
        }

        filteredRecipes = filteredRecipesByQuery;
    }

    return filteredRecipes;
}
