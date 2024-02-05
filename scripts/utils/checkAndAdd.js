import { normalizeInput } from "./normalization.js";

export function checkAndAddToTagList(cookingElement, normalizedInput, tagList) {
    const normalizedItem = normalizeInput(cookingElement);

    if (!tagList.includes(normalizedItem) && normalizedItem.includes(normalizedInput)) {
        tagList.push(normalizedItem);
    }
}