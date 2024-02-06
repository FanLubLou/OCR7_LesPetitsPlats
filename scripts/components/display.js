import { cardFactory } from '../factory/cardFactory.js';
import { toggleTag } from '../utils/toggleTag.js';
// import { getTagList } from '../utils/toggleTag.js';
import { handleSearchInput } from '../utils/searchEvents.js';
import { recipes } from '../../data/recipes.js';
import { filterRecipes } from '../utils/filterRecipes.js';
import { normalizeInput } from '../utils/normalization.js';
import { updateRecipeCountElement } from '../utils/updateRecipesCount.js';
import { getTagList } from '../utils/reconstructTagList.js';
import { escapeHtml } from '../utils/inputConversion.js';



/****************************************************
* DEFINITION DE LA FONCTION D'AFFICHAGE DES RECETTES _ FACTORY PATTERN
*****************************************************/
export function recipeRender(dataRecipes) {        
    dataRecipes.forEach((card) => {      
        const mediaCardModel = cardFactory(card);
        mediaCardModel.createCard();               
    });     
};

/****************************************************
* DEFINITION DE LA FONCTION DE MISE A JOUR DE L'AFFICHAGE DES RECETTES EN FONCTION DE LA LISTE DES TAGS
*****************************************************/

export function updateDisplayRecipes(recipes, TagList, searchQuery) {
    
    // On va d'abord sélectionner la troisième section destinée à afficher les recettes afin de la vider
    var sectionElement = document.querySelector('.thirdSection_recipesDisplay');
    sectionElement.innerHTML = '';

    const filteredRecipes = filterRecipes(recipes, TagList, searchQuery);
    if (filteredRecipes.length === 0) {        
        const noRecipeMessage = document.createElement('p');
        noRecipeMessage.textContent = 'Aucune recette ne correspond à vos critères.';
        noRecipeMessage.classList.add('no-recipe-message'); 
        sectionElement.appendChild(noRecipeMessage);
    } else {
        recipeRender(filteredRecipes);
    }
    updateRecipeCountElement(filteredRecipes);
};


/*********************************************************
* DEFINITION DE LA FONCTION D'AFFICHAGE DES SUGGESTIONS 
********************************************************/

export function displaySuggestions() {
    return function (event) {
        const elementId = event.currentTarget.id;
        //Ici elementId va être soit FirstLign_Ingredients, soit FirstLign_Appareils, soit FirstLign_Ustensiles
        const suggestionType = elementId.split('_')[1];
        //Le split nous permet alors de récupérer soit Ingredients, soit Appareils, soit Ustensiles.            
        // Gestion du sens du chevron et de l'aggrandissement du bloc d'affichage
        const chevronIcon = this.querySelector('.fa-solid');
        chevronIcon.classList.toggle('rotate');
        const choiceBox = document.getElementById(suggestionType);
        choiceBox.classList.toggle("active");
        // Mise à jour de la liste des suggestions
        updateRenderSuggestion(suggestionType);
    };
};

/*********************************************************
* DEFINITION DE LA FONCTION DE MISE A JOUR DE L AFFICHAGE DES SUGGESTIONS
********************************************************/
export function updateRenderSuggestion(suggestionType, searchValue) {
    
    //On récupère ici les informations pour l'affichage: la liste des tags, la liste des recettes et les informations dans la barre de recherche principale
    const tagList = getTagList();
    const searchInput = document.getElementById('search-recipe');
    const filteredRecipes = handleSearchInput(searchInput, recipes, tagList);


    //On constitue un tableau trié d'elements uniques de trois manière différentes car les données sont différentes à chaque fois. 
        //Ingredients est un tableau d'objets contenant des propriétés telles que ingredient (au singulier)
        //Appliance est une chaîne de caractère
        //Ustensils est un tableau de chaînes de caractère
    let uniqueItemsSet = new Set();
    switch (suggestionType) {
        case 'Ingredients':
            for (const recipe of filteredRecipes) {
                for (const ingredient of recipe.ingredients) {
                    const formattedIngredient = normalizeInput(ingredient.ingredient);
                    if (!uniqueItemsSet.has(formattedIngredient)) {
                        uniqueItemsSet.add(formattedIngredient);
                    }
                }
            }
            break;
        case 'Appareils':
            for (const recipe of filteredRecipes) {
                const formattedAppliance = normalizeInput(recipe.appliance);
                if (!uniqueItemsSet.has(formattedAppliance) ) {
                    uniqueItemsSet.add(formattedAppliance);
                }
            }
            break;
        case 'Ustensiles':
            for (const recipe of filteredRecipes) {
                for (const ustensil of recipe.ustensils) {
                    const formattedUstensil = normalizeInput(ustensil);
                    if (!uniqueItemsSet.has(formattedUstensil)) {
                        uniqueItemsSet.add(formattedUstensil);
                    }
                }
            }
            break;
        default:
            console.log(`Type de suggestion non pris en charge : ${suggestionType}`);
            return;
    }
    const uniqueItemsArray = Array.from(uniqueItemsSet).sort();

    /*********************************************************
    * FILTRE DU TABLEAU CONSTITUE AVEC LES DONNEES ENTREES SUR LES BARRES DE RECHERCHE SPECIFIQUES
    ********************************************************/
    let filteredItemsArray;
    if (searchValue) {
        const normalizedsearchValue = normalizeInput(searchValue);
        const escapedsearchValue = escapeHtml(normalizedsearchValue);
        filteredItemsArray = uniqueItemsArray.filter(item => item.startsWith(escapedsearchValue));
    } else {
        filteredItemsArray = uniqueItemsArray;
    }
    

    //Gestion de l'affichage.
    const listSuggestions = document.getElementById(`listSuggestions${suggestionType}`);
    listSuggestions.innerHTML = "";

    for (const item of filteredItemsArray) {
        const listItem = document.createElement("li");
        listItem.textContent = item;

        if (tagList.includes(item)) {
            listItem.classList.add("surligne");

            const closeIcon = document.createElement("span");
            closeIcon.innerHTML = "X";
            closeIcon.classList.add("croix");

            closeIcon.addEventListener('click', function (event) {
                event.stopPropagation();
                const updatedTagList = toggleTag(item);
                displayTagList(updatedTagList);
                updateRenderSuggestion(suggestionType, searchValue);
            });
            listItem.appendChild(closeIcon);
        }
        listItem.addEventListener('click', function () {
            const updatedTagList = toggleTag(item);
            displayTagList(updatedTagList);
            updateRenderSuggestion(suggestionType, searchValue);
        });
        listSuggestions.appendChild(listItem);
    }
};


/*********************************************************
* DEFINITION DE LA FONCTION D'AFFICHAGE DES TAGS 
********************************************************/

export function displayTagList(tagList) {
    // Sélectionnez l'élément section où vous souhaitez afficher dynamiquement les ingrédients
    var sectionElement = document.querySelector('.secondSection_selectedCriterias');
    sectionElement.innerHTML = '';
    // Parcourez la liste d'ingrédients et générez le code HTML dynamiquement
    tagList.forEach(function (ingredient) {
            // Créez un élément div avec la classe "DisplayChoiceBoxes"
            var displayChoiceBox = document.createElement('div');
            displayChoiceBox.className = 'DisplayChoiceBoxes';
            // Ajoutez un span avec la classe "DisplayChoiceBoxesText" contenant l'ingrédient
            var textSpan = document.createElement('span');
            textSpan.className = 'DisplayChoiceBoxesText';
            textSpan.textContent = ingredient;
            // Ajoutez un span avec la classe "DisplayChoiceBoxesClose" pour le bouton de fermeture
            var closeSpan = document.createElement('span');
            closeSpan.className = 'DisplayChoiceBoxesClose';
            closeSpan.textContent = 'X';
            closeSpan.addEventListener('click', function(e) {
                // Empêche la propagation du clic pour éviter de déclencher le clic de l'élément
                e.stopPropagation();            
                tagList.splice(tagList.indexOf(ingredient), 1);
                displayTagList(tagList);                
            });
            // Ajoutez les spans au div
            displayChoiceBox.appendChild(textSpan);
            displayChoiceBox.appendChild(closeSpan);
            // Ajoutez le div généré à la section
            sectionElement.appendChild(displayChoiceBox);
    });
    updateDisplayRecipes(recipes, tagList);
};



