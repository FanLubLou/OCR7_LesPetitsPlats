//La fonction permet ici d'echapper les données c'est à dire de convertir les caractères spéciaux en entités HTML afin d'éviter l'exécution involontaire de balise HTML.

export function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}