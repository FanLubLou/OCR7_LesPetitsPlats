
/****************************************************
* DEFINITION DE LA FONCTION FILTRANT LES RECETTES EN FONCTION DE LA LISTE DE TAGS (NORMALISEE)
*****************************************************/
// A noter qu'ici, on prend la liste des tags qui a déjà été normalisée.


export function filterRecipesByTags(recipes, normalizedTags, searchQuery) {
    if (normalizedTags.length === 0 && !searchQuery) {
        return recipes;
    }

    const filteredRecipes = recipes.filter(recipe => {
        const containsAllTags = normalizedTags.every(tag => (
            recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(tag) ||
            recipe.ustensils.some(ustensil => ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(tag)) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(tag))
        ));

        const containsSearchQuery = (
            !searchQuery || // Si la recherche est vide, on considère que la recette passe la recherche
            recipe.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchQuery) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchQuery)) ||
            recipe.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchQuery)
        );

        return containsAllTags && containsSearchQuery;
    });

    return filteredRecipes;
}

