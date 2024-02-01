import { recipes } from '../../data/recipes.js';
import { displaySuggestions } from '../components/display.js';
import { handleDocumentClick } from '../utils/handleDocumentClick.js';
import { updateDisplayRecipes } from '../components/display.js';
import { getTagList } from '../utils/toggleTag.js';
import { updateRecipeCountElement } from '../utils/updateRecipesCount.js';
import { filterRecipesByTags } from '../utils/filterRecipesByTags.js';



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
* AFFICHAGE DES SUGGESTIONS DES ELEMENTS DE CUISINE
********************************************************/
const cookingElements = document.querySelectorAll('.ChoiceBoxesFirstLign');
cookingElements.forEach(element => {
  element.addEventListener("click", displaySuggestions());
});



 // Attendre que le document soit chargé
 document.addEventListener('DOMContentLoaded', function () {
  // Sélectionner l'élément de recherche
  const searchInput = document.getElementById('search-recipe');

  // Ajouter un gestionnaire d'événements à l'entrée de l'utilisateur
  searchInput.addEventListener('input', function () {
      // Récupérer la valeur de la barre de recherche
      const searchQuery = searchInput.value.trim().toLowerCase();

      // Vérifier si la longueur de la recherche est supérieure ou égale à 3 caractères
      if (searchQuery.length >= 3) {
        // Appeler la fonction de filtrage avec les trois paramètres
          console.log('tagList',tagList)
          const filteredRecipes = filterRecipesByTags(recipes, tagList, searchQuery);
          
        
          updateDisplayRecipes(filteredRecipes, tagList);
          // Faire quelque chose avec les recettes filtrées, par exemple, les afficher.
          // console.log('filteredRecipes:',filteredRecipes);
      }
  });
});






/*********************************************************
* FERMETURE DES MENUS DEROULANTS LORS DE CLIC DANS LE VIDE DE L'UTILISATEUR
********************************************************/
document.addEventListener("click", handleDocumentClick); 



