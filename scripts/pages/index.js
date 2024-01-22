import { recipes } from '../../data/recipes.js';
import { recipeRender } from '../components/display.js';

//On affiche les recettes dans la troisième section
recipeRender(recipes);


let tagList = [];

// Définition de la Fonction de mise à jour de la liste des tags.
function toggleTag(ingredient) {
    if (ingredient.endsWith('\n✖')) {
         // Retirez '\n✖' de la fin du texte
        var nouveauTexte = texteDeLElement.replace(/\n✖$/, '');
        // Mettez à jour le texte de l'élément
        ingredient.textContent = nouveauTexte;
    }
    
    const index = tagList.indexOf(ingredient);
    if (index === -1) {
        // Si l'élément n'est pas déjà dans la liste, l'ajouter.
        tagList.push(ingredient);
    } else {
        // Si l'élément est déjà dans la liste, le retirer.
        tagList.splice(index, 1);
    }
    displayTagList(tagList);
}

//Definition de la fonction d'affichage des tags

function displayTagList(tagList) {
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
    
}


// Defintion de la fonction d'affichage des suggestions
function displaySuggestions() {
    const chevronIcon = this.querySelector('.fa-solid');
    chevronIcon.classList.toggle('rotate');    

        // Créer un ensemble pour stocker les ingrédients uniques
const uniqueIngredients = new Set();

// Boucle pour parcourir chaque recette
for (const recipe of recipes) {
    // Boucle pour parcourir chaque ingrédient de la recette
    for (const ingredient of recipe.ingredients) {
        // Vérifier si l'ingrédient est déjà dans l'ensemble avant de l'ajouter
        if (!uniqueIngredients.has(ingredient.ingredient)) {
            // Ajouter l'ingrédient à l'ensemble
            uniqueIngredients.add(ingredient.ingredient);
        }
    }
}
// Convertir l'ensemble en tableau
const uniqueIngredientsArray = Array.from(uniqueIngredients).sort();

    
    
//Récupérer la boite d'affichage dédiée pour lui permettre de s'aggrandir en lui ajoutant la classe "active"
const ChoiceBoxIng = document.getElementById("ingredients");
ChoiceBoxIng.classList.toggle("active");
    
//Récupérer le bloc dédié à l'affichage des suggestions
    const listSuggestions = document.getElementById("listSuggestions");    
    
//On lui implémente la liste des suggestions
for (const ingredient of uniqueIngredientsArray) {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    // Ajoutez l'événement click à chaque élément li
    listItem.addEventListener('click', function () {
        toggleTag(listItem.innerText);       
       });  
        listSuggestions.appendChild(listItem);
    }
    
};

// Appel de la fonction d'affichage des suggestions
const IngSuggestions = document.getElementById("FirstLign_Ingredients");
IngSuggestions.addEventListener("click", displaySuggestions)

//Fonction qui ferme tous les menus déroulants lors d'un clic "dans le vide"

document.addEventListener("click", function (event) {
    const ChoiceBoxesContents = document.querySelectorAll('.ChoiceBoxesContent');
    ChoiceBoxesContents.forEach(function (ChoiceBoxesContent) {
        const isClickInside = ChoiceBoxesContent.contains(event.target);
        if (!isClickInside) {
            ChoiceBoxesContent.classList.remove("active");                    
        }    
    })
    const chevronIcons = document.querySelectorAll('.fa-chevron-down');
    chevronIcons.forEach(function (chevronIcon) {
        const isClickInside = chevronIcon.contains(event.target);
        if (!isClickInside) {
            chevronIcon.classList.remove('rotate');                
        }    
    }); 
    
});



