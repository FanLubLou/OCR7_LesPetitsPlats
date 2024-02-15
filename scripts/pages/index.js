import { recipes } from '../../data/recipes.js';
import { displaySuggestions } from '../components/display.js';
import { handleDocumentClick } from '../utils/handleDocumentClick.js';
import { updateDisplayRecipes } from '../components/display.js';
import { updateRecipeCountElement } from '../utils/updateRecipesCount.js';
import { handleSearchInput } from '../utils/searchEvents.js';
import { handleSearchFormSubmit } from '../utils/searchFormSubmission.js';
import { updateRenderSuggestion } from '../components/display.js';



/*********************************************************
* AFFICHAGE DES RECETTES EN FONCTION DE LA LISTE DES RECETTES TRIEES
********************************************************/
updateDisplayRecipes(recipes);

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
    const filteredRecipes = handleSearchInput(searchInput, recipes);
    
    updateDisplayRecipes(filteredRecipes);
  });  
});

/*********************************************************
* ECOUTEUR D EVENEMENTS SUR LA SAISIE DANS LA BARRE PRINCIPALE DE RECHERCE OU SUR LE CLIC SUR LA LOUPE.
********************************************************/
//Ici, après test, il ne semble pas nécessaire d'encapsuler le tout dans un écouteur d'événement dédié à l'événement 'DOMContentLoaded'.
const searchForm = document.getElementById('search-recipe');
const searchButton = document.querySelector('.fa-magnifying-glass');
if (searchForm) {
  searchForm.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
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
* ECOUTEUR D EVENEMENTS SUR LA SAISIE DANS LES BARRES DE RECHERCE SPECIFIQUES.
********************************************************/

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionnez le conteneur des barres de recherche spécifiques
  const searchContainers = document.querySelectorAll('.specificSearch');

  // Ajoutez un écouteur d'événements à chaque conteneur
  searchContainers.forEach(container => {
      container.addEventListener('input', function(event) {
          const input = event.target; // L'élément qui a déclenché l'événement
          const searchType = input.id.split('_')[1]; // Obtenez le type de recherche (Ingredients, Appareils ou Ustensiles)
          const searchValue = input.value.trim(); // Obtenez la valeur saisie dans la barre de recherche

          // Vérifiez si la valeur saisie est au moins de trois caractères
          if (searchValue.length >= 3) {
            // Mise à jour de la liste de suggestions en fonction du type de recherche et de la valeur saisie
            updateRenderSuggestion(searchType, searchValue);
          } else {
            updateRenderSuggestion(searchType);
          }
      });
  });
  searchContainers.forEach(searchContainer => {    
    const searchBar = searchContainer.querySelector('input[type="search"]'); 
    searchBar.addEventListener('blur', () => {       
        searchBar.value = '';
    });
  });
});


/*********************************************************
* FERMETURE DES MENUS DEROULANTS LORS DE CLIC DANS LE VIDE DE L'UTILISATEUR
********************************************************/
document.addEventListener("click", handleDocumentClick); 



