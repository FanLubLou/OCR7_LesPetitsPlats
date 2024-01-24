import { cardFactory } from '../factory/cardFactory.js';
import { toggleTag } from '../utils/toggleTag.js';
import { recipes } from '../../data/recipes.js';

let tagList = [];

/****************************************************
* DEFINITION DE LA FONCTION D'AFFICHAGE DES RECETTES _ FACTORY PATTERN
*****************************************************/
export function recipeRender(dataRecipes) {        
    dataRecipes.forEach((card) => {      
        const mediaCardModel = cardFactory(card);
        mediaCardModel.createCard();               
    });     
};

/*********************************************************
* DEFINITION DE LA FONCTION D'AFFICHAGE DES SUGGESTIONS 
********************************************************/

export function displaySuggestions() {
    const elementId = this.id;
    console.log("ID de l'élément cliqué :", elementId);

    switch (elementId) {
        case 'FirstLign_Ingredients':
            const chevronIconIng = this.querySelector('.fa-solid');
            chevronIconIng.classList.toggle('rotate');
            // Créer un ensemble pour stocker les ingrédients uniques
            const uniqueIngredients = new Set();
            // Boucle pour parcourir chaque recette
            for (const recipe of recipes) {
                // Boucle pour parcourir chaque ingrédient de la recette
                for (const ingredient of recipe.ingredients) {
                    // Formater l'ingrédient en minuscules et sans accents
                    const formattedIngredient = ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    // Vérifier si l'ingrédient est déjà dans l'ensemble avant de l'ajouter
                    if (!uniqueIngredients.has(formattedIngredient)) {
                        // Ajouter l'ingrédient à l'ensemble
                        uniqueIngredients.add(formattedIngredient);
                    }
                }
            }
            // Convertir l'ensemble en tableau
            const uniqueIngredientsArray = Array.from(uniqueIngredients).sort();
            //Récupérer la boite d'affichage dédiée pour lui permettre de s'aggrandir en lui ajoutant la classe "active"
            const ChoiceBoxIng = document.getElementById("ingredients");
            ChoiceBoxIng.classList.toggle("active");
            //Récupérer le bloc dédié à l'affichage des suggestions
            const listSuggestionsIng = document.getElementById("listSuggestionsIng");
            //On lui implémente la liste des suggestions
            for (const ingredient of uniqueIngredientsArray) {
                const listItem = document.createElement("li");
                listItem.textContent = ingredient;
                // Ajoutez l'événement click à chaque élément li
                listItem.addEventListener('click', function () {
                    toggleTag(listItem.innerText);
                });
                listSuggestionsIng.appendChild(listItem);
            };
        break;
        case 'FirstLign_Appareils':
            const chevronIconApp = this.querySelector('.fa-solid');
            chevronIconApp.classList.toggle('rotate');
            let appliancesSet = new Set();

            recipes.forEach(recipe => {
                appliancesSet.add(recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            });

            let appliancesList = Array.from(appliancesSet).sort();
            console.log(appliancesList);
            //Récupérer la boite d'affichage dédiée pour lui permettre de s'aggrandir en lui ajoutant la classe "active"
            const ChoiceBoxApp = document.getElementById("appareils");
            ChoiceBoxApp.classList.toggle("active");
            //Récupérer le bloc dédié à l'affichage des suggestions
            const listSuggestionsApp = document.getElementById("listSuggestionsApp");
            //On lui implémente la liste des suggestions
            for (const appliance of appliancesList) {
                const listItem = document.createElement("li");
                listItem.textContent = appliance;
                // Ajoutez l'événement click à chaque élément li
                listItem.addEventListener('click', function () {
                    toggleTag(listItem.innerText);
                });
                listSuggestionsApp.appendChild(listItem);
            };
        break;
        case 'FirstLign_Ustensiles':
            const chevronIconUst = this.querySelector('.fa-solid');
            chevronIconUst.classList.toggle('rotate');
            // Créer un ensemble pour stocker les ingrédients uniques
            let ustensilsSet = new Set();

            recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    ustensilsSet.add(ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                });
            });

            let ustensilsList = Array.from(ustensilsSet).sort();
            //Récupérer la boite d'affichage dédiée pour lui permettre de s'aggrandir en lui ajoutant la classe "active"
            const ChoiceBoxUst = document.getElementById("Ustensiles");
            ChoiceBoxUst.classList.toggle("active");
            //Récupérer le bloc dédié à l'affichage des suggestions
            const listSuggestionsUst = document.getElementById("listSuggestionsUst");
            //On lui implémente la liste des suggestions
            for (const ustensil of ustensilsList) {
                const listItem = document.createElement("li");
                listItem.textContent = ustensil;
                // Ajoutez l'événement click à chaque élément li
                listItem.addEventListener('click', function () {
                    toggleTag(listItem.innerText);
                });
                listSuggestionsUst.appendChild(listItem);
            };
        break;
        default:
    console.log(`Il y a un souci dans le switch de la fonction displaySuggestions`);
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
};