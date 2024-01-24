import { displayTagList } from '../components/display.js'


let tagList = [];
// Définition de la Fonction de mise à jour de la liste des tags.
export function toggleTag(ingredient) {
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