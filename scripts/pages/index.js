import { recipes } from '../../data/recipes.js';
import { recipeRender } from '../components/display.js';

//On affiche les recettes dans la troisième section
recipeRender(recipes);


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
console.log(ChoiceBoxIng);    
ChoiceBoxIng.classList.toggle("active");
    
//Récupérer le bloc dédié à l'affichage des suggestions
    const listSuggestions = document.getElementById("listSuggestions");    
    
//On lui implémente la liste des suggestions
for (const ingredient of uniqueIngredientsArray) {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    // Ajoutez l'événement click à chaque élément li
    listItem.addEventListener('click', function () {
        var estSurligne = listItem.classList.contains('surligne');

        // Si l'élément est surligné, retire le surlignement et la croix
        if (estSurligne) {
            listItem.classList.remove('surligne');
            listItem.removeChild(listItem.querySelector('.croix'));
        } else {
          // Sinon, surligne l'élément en jaune
          listItem.classList.add('surligne');
  
          // Ajoute une croix de fermeture à côté de l'élément
          var croix = document.createElement('span');
          croix.classList.add('croix');
          croix.textContent = '✖';
          croix.addEventListener('click', function(e) {
            // Empêche la propagation du clic pour éviter de déclencher le clic de l'élément
            e.stopPropagation();
  
            // Retire le surlignement et la croix lorsque la croix est cliquée
            listItem.classList.remove('surligne');
            listItem.removeChild(croix);
            });

            listItem.appendChild(croix);
          }  
    // Vous pouvez ajouter ici le code que vous souhaitez exécuter lorsque l'élément est cliqué
    //console.log('Ingrédient cliqué:', ingredient);
    // Ou appelez une fonction spécifique pour gérer le clic sur l'ingrédient
    // handleIngredientClick(ingredient);
  });
    listSuggestions.appendChild(listItem);
}   
}

// Appel de la fonction d'affichage des suggestions
const IngSuggestions = document.getElementById("FirstLign_Ingredients");
IngSuggestions.addEventListener("click",displaySuggestions)



