// import { getTagList } from "./toggleTag.js";
import { normalizeInput } from "./normalization.js";
import { escapeHtml } from "./inputConversion.js";
import { recipes } from "../../data/recipes.js";
import { checkAndAddToTagList } from "./checkAndAdd.js";
import { displayTagList } from "../components/display.js";
import { getTagList } from "./reconstructTagList.js";

// Définit la fonction qui sera appelée lors de la soumission du formulaire
export function handleSearchFormSubmit(event) {
    event.preventDefault(event); 
    const searchInput = document.getElementById('search-recipe');
    const rawUserInput = searchInput.value.trim();
    const normalizedInput = normalizeInput(rawUserInput);
    const userInput = escapeHtml(normalizedInput);
    
    if (userInput.length >= 3) {
        
        const tagList = getTagList();
        
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const normalizedIngredient = normalizeInput(ingredient.ingredient);
                if (normalizedIngredient === userInput) {
                    checkAndAddToTagList(ingredient.ingredient, userInput, tagList);
                }
            });
        
            recipe.ustensils.forEach(ustensil => {
                const normalizedUstensil = normalizeInput(ustensil);
                if (normalizedUstensil === userInput) {
                    checkAndAddToTagList(ustensil, userInput, tagList);
                }
            });
        
            const normalizedAppliance = normalizeInput(recipe.appliance);
            if (normalizedAppliance === userInput) {
                checkAndAddToTagList(recipe.appliance, userInput, tagList);
            }
        });

        // Maintenant, tagList est mise à jour avec les correspondances trouvées
        displayTagList(tagList);
        searchInput.value = '';
    }
}