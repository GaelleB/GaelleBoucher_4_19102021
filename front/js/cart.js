// Sélection de la balise <article>
let cartItems = document.getElementById("cart__items");
let cartPrice = document.getElementById("cart_price");

// Affichage des données dans le panier
function affichagePanier() {
    let sauvegardeProduitLocalStorage = [] = JSON.parse(localStorage.getItem('product'))
    if (sauvegardeProduitLocalStorage === null) {
        return [];
    } else {
        for (let i = 0; i > sauvegardeProduitLocalStorage.length; i++) {
            console.log(sauvegardeProduitLocalStorage[i].length);
            cartItems.innerHTML += `<article class="cart__item" data-id="${sauvegardeProduitLocalStorage[i].id} "data-color="${sauvegardeProduitLocalStorage[i].color}">
                    <div class="cart__item__img">
                        <img src="${sauvegardeProduitLocalStorage[i].imageUrl}" alt="${sauvegardeProduitLocalStorage[i].altTxt}" />
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>"${sauvegardeProduitLocalStorage[i].name}"</h2>
                            <p>"${sauvegardeProduitLocalStorage[i].color}"</p>
                            <p>"${sauvegardeProduitLocalStorage[i].price}"</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sauvegardeProduitLocalStorage[i].quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article>`;
                cartPrice.innerHTML += `<p>Total (<span id="totalQuantity">${sauvegardeProduitLocalStorage[i].quantity}</span> articles) : <span id="totalPrice">${sauvegardeProduitLocalStorage[i].price}</span> €</p>`;
        }
    }
}