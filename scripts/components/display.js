import { cardFactory } from '../factory/cardFactory.js';

export function recipeRender(dataRecipes) {        
    dataRecipes.forEach((card) => {      
        const mediaCardModel = cardFactory(card);
        mediaCardModel.createCard();               
    });     
}