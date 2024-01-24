

export function handleDocumentClick(event) {
    const ChoiceBoxesContents = document.querySelectorAll('.ChoiceBoxesContent');
    ChoiceBoxesContents.forEach(function (ChoiceBoxesContent) {
        const isClickInside = ChoiceBoxesContent.contains(event.target);
        if (!isClickInside) {
            ChoiceBoxesContent.classList.remove("active");
            var ChevronIconToBeRemoved = ChoiceBoxesContent.querySelector('.fa-solid');
            ChevronIconToBeRemoved.classList.remove("rotate");
        }    
    });
}