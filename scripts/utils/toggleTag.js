
let tagList = [];
// Définition de la Fonction de mise à jour de la liste des tags.
export function toggleTag(cookingElt) {
    if (cookingElt.endsWith('\n✖')) {
         // Retirez '\n✖' de la fin du texte
        var nouveauTexte = texteDeLElement.replace(/\n✖$/, '');
        // Mettez à jour le texte de l'élément
        cookingElt.textContent = nouveauTexte;
    }    
    const index = tagList.indexOf(cookingElt);
    if (index === -1) {
        // Si l'élément n'est pas déjà dans la liste, l'ajouter.
        tagList.push(cookingElt);
    } else {
        // Si l'élément est déjà dans la liste, le retirer.
        tagList.splice(index, 1);
    }
    return tagList;    
}

export function getTagList() {
    return tagList;
}