// Affichage du numéro de commande en récupéranr l'id dans l'url de confirmation.html

function getId() {
    return new URLSearchParams(window.location.search).get("id");
}
const id = getId()

// Sélecteur
const orderId = document.querySelector("#orderId");

// Affichage des informations textuelles
orderId.innerText = id;

// Apparition dans le DOM et affichage dans la page confirmation
localStorage.clear()