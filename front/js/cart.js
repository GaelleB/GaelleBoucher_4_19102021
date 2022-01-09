    // Sélection de la balise <article>
    let cartItems = document.getElementById("cart__items");
    let cartPrice = document.getElementById("cart_price");

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

    // Affichage des données dans le panier
    function affichagePanier() {
        let sauvegardeProduitLocalStorage = panier()
            for (let i = 0; i < sauvegardeProduitLocalStorage.length; i++) {
                cartItems.innerHTML += `<article class="cart__item" data-id="${sauvegardeProduitLocalStorage[i].id} "data-color="${sauvegardeProduitLocalStorage[i].color}">
                        <div class="cart__item__img">
                            <img src="${sauvegardeProduitLocalStorage[i].img}" alt="${sauvegardeProduitLocalStorage[i].alt}" />
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${sauvegardeProduitLocalStorage[i].nom}</h2>
                                <p>${sauvegardeProduitLocalStorage[i].colors}</p>
                                <p>${sauvegardeProduitLocalStorage[i].prix}</p>
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
                    //cartPrice.innerHTML += `<p>Total (<span id="totalQuantity">${sauvegardeProduitLocalStorage[i].quantity}</span> articles) : <span id="totalPrice">${sauvegardeProduitLocalStorage[i].price}</span> €</p>`;
            }  
            }
        
    affichagePanier();

    // Supprimer un produit
    let deleteProduct = () => {
        let deleteItemContainer = [...document.getElementsByClassName('deleteItem'),
        ]
        let pickArticle = [...document.querySelectorAll(`.cart__item`)]
        deleteItemContainer.forEach((element, index) => {
        element.addEventListener('click', () => {
            sauvegardeProduitLocalStorage.splice(index, 1)
            localStorage.setItem('product',JSON.stringify(sauvegardeProduitLocalStorage)
            )
            
            pickArticle[index].remove()
            
            panier()
            calcul()
            location.reload()
        })
        })
        if (document.URL.includes('cart.html')) {
            if (!sauvegardeProduitLocalStorage[0]) {
                localStorage.removeItem('product')
            }
        }
    }
    deleteProduct()
        
        // Modifie la quantité d'un produit
        let modifProduit = () => {
            let itemQuantity = [...document.getElementsByClassName('itemQuantity'),
            ]
            // Modifie la quantité
            itemQuantity.forEach((item, index) => {
                item.addEventListener('click', () => {
                    sauvegardeProduitLocalStorage[index].qty = itemQuantity[index].value
                    localStorage.setItem('product',JSON.stringify(sauvegardeProduitLocalStorage)
                    )
                    panier()
                    calcul()
                })
            })
        }
        modifProduit()
        

    function calcul () {
        let product = panier()
        let total = 0
        for (let i = 0; i < product.length; i++) {
            console.log (product[i].prix)
            console.log (product[i].quantity)
            let prix = product[i].prix
            let quantite = product[i].quantity
            total += prix * quantite
        }
        console.log(total)
    }
    calcul()