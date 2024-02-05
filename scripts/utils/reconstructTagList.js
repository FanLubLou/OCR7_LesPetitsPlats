export function getTagList() {
    // Sélectionnez tous les éléments div avec la classe "DisplayChoiceBoxes"
    const displayChoiceBoxes = document.querySelectorAll('.DisplayChoiceBoxes');

    // Initialise une nouvelle liste pour la reconstruction de la tagList
    const reconstructedTagList = [];

    // Parcourez les éléments et extrayez le texte de chaque élément
    displayChoiceBoxes.forEach(displayChoiceBox => {
        const textSpan = displayChoiceBox.querySelector('.DisplayChoiceBoxesText');
        if (textSpan) {
            const ingredient = textSpan.textContent;
            reconstructedTagList.push(ingredient);
        }
    });

    // Retourne la tagList reconstruite
    return reconstructedTagList;
}