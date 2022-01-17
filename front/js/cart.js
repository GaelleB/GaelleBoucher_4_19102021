    // Sélection de la balise <article>
    let cartItems = document.getElementById("cart__items");

    // Récupère les données du localStorage
    let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'))
    let sauvegardeContactLocalStorage = JSON.parse(localStorage.getItem('contact'))

    function panier() {
        let check = localStorage.getItem('product')
        if (check) {
            return JSON.parse(localStorage.getItem('product'))
        } else {
            let titre = document.querySelector('h1')
            titre.innerText = "Votre panier est vide"
            return [];
        }
    }

    