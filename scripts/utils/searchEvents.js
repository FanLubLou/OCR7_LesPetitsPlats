import { filterRecipes } from "./filterRecipes.js";
import { normalizeInput } from "./normalization.js";
import { escapeHtml } from "./inputConversion.js";
import { getTagList } from "./reconstructTagList.js";

let filteredRecipes = []; 

export function handleSearchInput(searchInput, recipes) {
    const userInput = searchInput.value.trim();    
    const normalizedInput = normalizeInput(userInput);
    const searchQuery = escapeHtml(normalizedInput);
    const tagList = getTagList();    
    if (searchQuery.length >= 3) {
        filteredRecipes = filterRecipes(recipes, tagList, searchQuery);
        return filteredRecipes;
    } else {
        filteredRecipes = filterRecipes(recipes, tagList);
        return filteredRecipes;
    }
}


