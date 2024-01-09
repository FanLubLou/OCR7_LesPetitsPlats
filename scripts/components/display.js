import { cardFactory } from '../factory/cardFactory.js';

export function recipeRender(dataRecipes) {        
    dataRecipes.forEach((media) => {      
        const mediaCardModel = cardFactory(media);
        mediaCardModel.createCard();               
    });     
}