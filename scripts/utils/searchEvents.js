import { filterRecipes } from "./filterRecipes.js";
import { normalizeInput } from "./normalization.js";
import { escapeHtml } from "./inputConversion.js";

let filteredRecipes = []; // Déclare la variable en dehors de la fonction

// Fonction de gestion d'événements
export function handleSearchInput(searchInput, recipes, tagList) {
    const userInput = searchInput.value.trim();    
    const normalizedInput = normalizeInput(userInput);
    const searchQuery = escapeHtml(normalizedInput);
    
    if (searchQuery.length >= 3) {
        filteredRecipes = filterRecipes(recipes, tagList, searchQuery);
        return filteredRecipes;
    } else {
        filteredRecipes = filterRecipes(recipes, tagList);
        return filteredRecipes;
    }
}

// Ajoute une fonction pour obtenir filteredRecipes si nécessaire
export function getFilteredRecipes() {
    return filteredRecipes;
}
