import { cardFactory } from '../factory/cardFactory.js';
import { toggleTag } from '../utils/toggleTag.js';
import { getTagList } from '../utils/toggleTag.js';
import { recipes } from '../../data/recipes.js';
import { filterRecipesByTags } from '../utils/filterRecipesByTags.js';
import { normalizeInput } from '../utils/normalization.js';
import { updateRecipeCountElement } from '../utils/updateRecipesCount.js';



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

    const filteredRecipesByTags = filterRecipesByTags(recipes, TagList);
    recipeRender(filteredRecipesByTags);
    updateRecipeCountElement(filteredRecipesByTags);
};


/*********************************************************
* DEFINITION DE LA FONCTION D'AFFICHAGE DES SUGGESTIONS 
********************************************************/

export function displaySuggestions() {
    return function (event) {
        const elementId = event.currentTarget.id;
        const tagList = getTagList();
        switch (elementId) {
            case 'FirstLign_Ingredients':
                
                /****************************
                * Gestion du sens du chevron et de l'aggrandissement du bloc d'affichage
                *****************************/
                const chevronIconIng = this.querySelector('.fa-solid');
                chevronIconIng.classList.toggle('rotate');
                
                const ChoiceBoxIng = document.getElementById("ingredients");
                ChoiceBoxIng.classList.toggle("active");
                
                /****************************
                * Mise à jour de la liste des suggestions
                *****************************/
                updateRenderSuggestionIng();
               
                break;
                case 'FirstLign_Appareils':
                /****************************
                * Gestion du sens du chevron et de l'aggrandissement du bloc d'affichage
                *****************************/
                const chevronIconApp = this.querySelector('.fa-solid');
                chevronIconApp.classList.toggle('rotate');
                
                const ChoiceBoxApp = document.getElementById("appareils");
                ChoiceBoxApp.classList.toggle("active");

                /****************************
                * Mise à jour de la liste des suggestions
                *****************************/
                updateRenderSuggestionApp();
                
                break;
                case 'FirstLign_Ustensiles':
                /****************************
                * Gestion du sens du chevron et de l'aggrandissement du bloc d'affichage
                *****************************/
                const chevronIconUst = this.querySelector('.fa-solid');
                chevronIconUst.classList.toggle('rotate');

                const ChoiceBoxUst = document.getElementById("Ustensiles");
                ChoiceBoxUst.classList.toggle("active");
               
                updateRenderSuggestionUst();

                break;
            default:
                console.log(`Il y a un souci dans le switch de la fonction displaySuggestions`);
        }
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
                const filteredRecipesByTags = filterRecipesByTags(recipes, tagList);
                // updateRecipeCountElement(filteredRecipesByTags);
            });
            // Ajoutez les spans au div
            displayChoiceBox.appendChild(textSpan);
            displayChoiceBox.appendChild(closeSpan);
            // Ajoutez le div généré à la section
            sectionElement.appendChild(displayChoiceBox);
    });
    updateDisplayRecipes(recipes, tagList);
};


/*********************************************************
* DEFINITION DE LA FONCTION DE MISE A JOUR DE L AFFICHAGE DES SUGGESTIONS D ING 
********************************************************/

function updateRenderSuggestionIng() {
    
    const tagList = getTagList();
    

     /****************************
    * Récupération de la liste des recettes 
    *****************************/
    const filteredRecipesByTags = filterRecipesByTags(recipes, tagList);
    // updateRecipeCountElement(filteredRecipesByTags);
    
    
     /****************************
     * Création du tableau des ingrédients uniques
     *****************************/
    const uniqueIngredients = new Set();
    
    
     for (const recipe of filteredRecipesByTags) {
         for (const ingredient of recipe.ingredients) {
             // On Formate l'ingrédient en minuscules et sans accents
             const formattedIngredient = normalizeInput(ingredient.ingredient);
            
             // On vérifie si l'ingrédient est déjà dans l'ensemble avant de l'ajouter
             if (!uniqueIngredients.has(formattedIngredient)) {
                    uniqueIngredients.add(formattedIngredient);
                 
             }
         }
     }
    
    const uniqueIngredientsArray = Array.from(uniqueIngredients).sort();
   
     /****************************
     * Gestion de l'affichage
     *****************************/
     
     //On Récupére le bloc dédié à l'affichage des suggestions
     const listSuggestionsIng = document.getElementById("listSuggestionsIng");
     // Effacer le contenu précédent
     listSuggestionsIng.innerHTML = "";
     //On lui implémente la liste des suggestions
     for (const ingredient of uniqueIngredientsArray) {
         const listItem = document.createElement("li");
         listItem.textContent = ingredient;
         
         if (tagList.includes(ingredient)) {
            listItem.classList.add("surligne");

            const closeIcon = document.createElement("span");
            closeIcon.innerHTML = "X";
            closeIcon.classList.add("croix");

            // Ajouter un événement click pour la croix de fermeture
            closeIcon.addEventListener('click', function (event) {
                event.stopPropagation(); // Éviter la propagation du clic à l'élément li
                const updatedTagList = toggleTag(ingredient);
                displayTagList(updatedTagList);
                updateRenderSuggestionIng();
            });

            // Ajouter le span de fermeture à l'élément li
            listItem.appendChild(closeIcon);
        }
         // On ajoute l'événement click à chaque élément li
         listItem.addEventListener('click', function () {
             const updatedTagList = toggleTag(ingredient);
             displayTagList(updatedTagList);
             updateRenderSuggestionIng();
             
         });
         listSuggestionsIng.appendChild(listItem);
     };
}


function updateRenderSuggestionApp () {
        
        const tagList = getTagList();
        /****************************
         * Récupération de la liste des recettes 
        *****************************/
        const filteredRecipesByTags = filterRecipesByTags(recipes, tagList);
        // updateRecipeCountElement(filteredRecipesByTags);
   

        /****************************
        * Création du tableau des appareils uniques
        *****************************/
        let appliancesSet = new Set();
        filteredRecipesByTags.forEach(recipe => {
            appliancesSet.add(normalizeInput(recipe.appliance));
        });
        let appliancesList = Array.from(appliancesSet).sort();
        
        /****************************
        * Gestion de l'affichage
        *****************************/
                        
        //Récupérer le bloc dédié à l'affichage des suggestions
        const listSuggestionsApp = document.getElementById("listSuggestionsApp");
        // Effacer le contenu précédent
        listSuggestionsApp.innerHTML = "";
        //On lui implémente la liste des suggestions
        for (const appliance of appliancesList) {
            const listItem = document.createElement("li");
            listItem.textContent = appliance;
            
            if (tagList.includes(appliance)) {
                listItem.classList.add("surligne");
    
                const closeIcon = document.createElement("span");
                closeIcon.innerHTML = "X";
                closeIcon.classList.add("croix");
    
                // Ajouter un événement click pour la croix de fermeture
                closeIcon.addEventListener('click', function (event) {
                    event.stopPropagation(); // Éviter la propagation du clic à l'élément li
                    const updatedTagList = toggleTag(appliance);
                    displayTagList(updatedTagList);
                    updateRenderSuggestionApp();
                });
    
                // Ajouter le span de fermeture à l'élément li
                listItem.appendChild(closeIcon);
            }

            // Ajoutez l'événement click à chaque élément li
            listItem.addEventListener('click', function () {
                const tagList = toggleTag(appliance);
                displayTagList(tagList);
                updateRenderSuggestionApp();
            });
            listSuggestionsApp.appendChild(listItem);

        };
}

function updateRenderSuggestionUst() {
    const tagList = getTagList();
    const filteredRecipesByTags = filterRecipesByTags(recipes, tagList);
    // updateRecipeCountElement(filteredRecipesByTags);

    let ustensilsSet = new Set();
    filteredRecipesByTags.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(normalizeInput(ustensil));
        });
    });
    let ustensilsList = Array.from(ustensilsSet).sort();

    const listSuggestionsUst = document.getElementById("listSuggestionsUst");
    listSuggestionsUst.innerHTML = "";

    for (const ustensil of ustensilsList) {
        const listItem = document.createElement("li");

        listItem.textContent = ustensil;

        // Ajouter la croix de fermeture et le surlignement jaune seulement si l'ustensile est dans tagList
        if (tagList.includes(ustensil)) {
            listItem.classList.add("surligne");

            const closeIcon = document.createElement("span");
            closeIcon.innerHTML = "X";
            closeIcon.classList.add("croix");

            // Ajouter un événement click pour la croix de fermeture
            closeIcon.addEventListener('click', function (event) {
                event.stopPropagation(); // Éviter la propagation du clic à l'élément li
                const updatedTagList = toggleTag(ustensil);
                displayTagList(updatedTagList);
                updateRenderSuggestionUst();
            });

            // Ajouter le span de fermeture à l'élément li
            listItem.appendChild(closeIcon);
        }

        // Ajouter l'événement click à chaque élément li
        listItem.addEventListener('click', function () {
            const updatedTagList = toggleTag(ustensil);
            displayTagList(updatedTagList);
            updateRenderSuggestionUst();
        });

        // Ajouter l'élément li à la liste des suggestions
        listSuggestionsUst.appendChild(listItem);
    }
}
