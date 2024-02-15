export function getTagList() {
    
    const displayChoiceBoxes = document.querySelectorAll('.DisplayChoiceBoxes');
    const reconstructedTagList = [];
    displayChoiceBoxes.forEach(displayChoiceBox => {
        const textSpan = displayChoiceBox.querySelector('.DisplayChoiceBoxesText');
        if (textSpan) {
            const ingredient = textSpan.textContent;
            reconstructedTagList.push(ingredient);
        }
    });

    return reconstructedTagList;
}