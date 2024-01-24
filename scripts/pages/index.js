import { recipes } from '../../data/recipes.js';
import { recipeRender } from '../components/display.js';
import { displaySuggestions } from '../components/display.js';
import { handleDocumentClick } from '../utils/handleDocumentClick.js';




/*********************************************************
* AFFICHAGE DES RECETTES EN FONCTION DE LA LISTE DES RECETTES TRIEES
********************************************************/
recipeRender(recipes);


/*********************************************************
* AFFICHAGE DES SUGGESTIONS D'INGREDIENTS D'USTENSILES OU D'APPAREILS
********************************************************/
const cookingElements = document.querySelectorAll('.ChoiceBoxesFirstLign');
cookingElements.forEach(element => {
  element.addEventListener("click", displaySuggestions);
});



/*********************************************************
* FERMETURE DES MENUS DEROULANTS LORS DE CLIC DANS LE VIDE DE L'UTILISATEUR
********************************************************/
document.addEventListener("click", handleDocumentClick); 



