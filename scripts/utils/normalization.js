/****************************************************
* DEFINITION DE LA FONCTION DE NORMALISATION DES MOTS AFIN DE POUVOIR LES COMPARER ENTRE EUX
*****************************************************/
//toLowerCase va mettre en minuscule
//normalise avec NFD permet de séparer la lettre de base avec l'accent
//replace(/[\u0300-\u036f] permet d'éliminer les accents de la chaîne
// /g permet de cibler tous les caractères et de ne pas s'arrêter au premier caractère
export function normalizeInput(input) {
    return input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  