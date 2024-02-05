import { recipes } from '../../data/recipes.js';
import { displaySuggestions } from '../components/display.js';
import { handleDocumentClick } from '../utils/handleDocumentClick.js';
import { updateDisplayRecipes } from '../components/display.js';
// import { getTagList } from '../utils/toggleTag.js';
import { updateRecipeCountElement } from '../utils/updateRecipesCount.js';
import { handleSearchInput } from '../utils/searchEvents.js';
import { handleSearchFormSubmit } from '../utils/searchFormSubmission.js';
import { getTagList } from '../utils/reconstructTagList.js';



// Exemple d'utilisation
const tagList = getTagList();



/*********************************************************
* AFFICHAGE DES RECETTES EN FONCTION DE LA LISTE DES RECETTES TRIEES
********************************************************/
updateDisplayRecipes(recipes, tagList);


/*********************************************************
* MISE A JOUR DU NOMBRE DE RECETTES
********************************************************/
updateRecipeCountElement(recipes);


/*********************************************************
* AFFICHAGE DES SUGGESTIONS DES ELEMENTS DE CUISINE AU CLICK DE L'UTILISATEUR SUR UN DES TROIS MENUS DEROULANTS
********************************************************/
const cookingElements = document.querySelectorAll('.ChoiceBoxesFirstLign');
cookingElements.forEach(element => {
  element.addEventListener("click", displaySuggestions());
});



/*********************************************************
* APPEL DE LA FONCTION METTANT A JOUR L'INTERFACE (RECETTES PROPOSEES-LISTES DES SUGGESTIONS) SUR UTILISATION DE LA BARRE DE RECHERCHE PRINCIPALE
********************************************************/
 // Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-recipe');
  searchInput.addEventListener('input', function () {
    const filteredRecipes = handleSearchInput(searchInput, recipes, tagList);
    updateDisplayRecipes(filteredRecipes, tagList);
  });  
});


const searchForm = document.getElementById('search-recipe');
const searchButton = document.querySelector('.fa-magnifying-glass');
if (searchForm) {
  searchForm.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      console.log('Ca marche ou bien');
      handleSearchFormSubmit(event);
    }
  });
}
if (searchButton) {
  searchButton.addEventListener('click', function (event) {
    handleSearchFormSubmit(event)
  });
} 

/*********************************************************
* FERMETURE DES MENUS DEROULANTS LORS DE CLIC DANS LE VIDE DE L'UTILISATEUR
********************************************************/
document.addEventListener("click", handleDocumentClick); 



