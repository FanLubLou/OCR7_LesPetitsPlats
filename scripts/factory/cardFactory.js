export function cardFactory(recipes) {
    // On destructure pour avoir accès aux différentes propriétés qui nous interessent
    const {
        id,
        image,
        name,
        ingredients,
        time,
        description,        
    } = recipes;
    function createCard() {
        const thirdSection = document.querySelector('.thirdSection_recipesDisplay');
        const articleContent = `
        <article class="recipeCard" data-id=${id}>
            <img src="../../assets/images/${image}" alt="${name}">
            <div class="cookingTimeContainer">
                <span>${time}</span>
                <span>min</span>
            </div>
            <div class="recipeTextContent">
                    <h1>${name}</h1>
                    <div class="recipeContainer">
                        <div class="recipeTextContainer">
                            <h2>RECETTE</h2>
                            <p>${description}</p>
                        </div>
                        <div class="recipeIngredientContainer">    
                            <h2>INGREDIENTS</h2>
                            <ul class="recipeIngredientBoxContainer">
                            ${ingredients.map(ingredient => {
                                if (ingredient.quantity && ingredient.unit) {
                                    return `
                                        <li class="ingredientsBox">
                                            <span class="IngredientsBoxTitle">${ingredient.ingredient}</span>
                                            <span class="IngredientsBoxInfo">${ingredient.quantity} ${ingredient.unit}</span>
                                        </li>
                                            `;
                                } else {
                                    return `
                                        <li class="ingredientsBox">
                                            <span class="IngredientsBoxTitle">${ingredient.ingredient}</span>
                                        </li>
                                            `;
                                }
                            }).join('')} 
                        </ul>
                        </div>        
                    </div>
                </div>    
                    `        
        thirdSection.innerHTML += articleContent;
        return thirdSection;
    } 
    return { createCard };
}