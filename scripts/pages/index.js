import { recipes } from '../../data/recipes.js';
import { displaySuggestions } from '../components/display.js';
import { handleDocumentClick } from '../utils/handleDocumentClick.js';
import { updateDisplayRecipes } from '../components/display.js';
import { getTagList } from '../utils/toggleTag.js';



// Exemple d'utilisation
const tagList = getTagList;


/*********************************************************
* AFFICHAGE DES RECETTES EN FONCTION DE LA LISTE DES RECETTES TRIEES
********************************************************/
updateDisplayRecipes(recipes, tagList);



/*********************************************************
* AFFICHAGE DES SUGGESTIONS DES ELEMENTS DE CUISINE
********************************************************/
const cookingElements = document.querySelectorAll('.ChoiceBoxesFirstLign');
cookingElements.forEach(element => {
  element.addEventListener("click", displaySuggestions());
});


/*********************************************************
* FERMETURE DES MENUS DEROULANTS LORS DE CLIC DANS LE VIDE DE L'UTILISATEUR
********************************************************/
document.addEventListener("click", handleDocumentClick); 



