
/****************************************************
* DEFINITION DE LA FONCTION FILTRANT LES RECETTES EN FONCTION DE LA LISTE DE TAGS (NORMALISEE)
*****************************************************/
// A noter qu'ici, on prend la liste des tags qui a déjà été normalisée.

export function filterRecipesByTags(recipes, normalizedTags) {
    if (normalizedTags.length === 0) {
        return recipes;
    }

    const filteredRecipes = recipes.filter(recipe => {
        const containsAllTags = normalizedTags.every(tag => {
            const normalizedTag = tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return (
                recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTag) ||
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTag)) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTag))
            );
        });

        return containsAllTags;
    });

    return filteredRecipes;
}
