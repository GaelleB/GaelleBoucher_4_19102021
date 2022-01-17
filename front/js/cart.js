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

    // Affichage d'un tableau récapitulatif des achats dans la page Panier
    // Récupération l'array via le localStorage + création et insersion des éléments dans la page Panier
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
            }  
    }
    affichagePanier();

    // Gérer la modification et la suppression de produits dans la page Panier
    // Modification de la quantité d'un produit
    let modifProduit = () => {
        let itemQuantity = [...document.getElementsByClassName('itemQuantity'),
        ]
        itemQuantity.forEach((item, index) => {
            item.addEventListener('click', () => {
                sauvegardeProduitLocalStorage[index].quantity = itemQuantity[index].value
                localStorage.setItem('product',JSON.stringify(sauvegardeProduitLocalStorage)
                )
                panier()
            })
        })
    }
    modifProduit()

    // Suppression d'un produit
    let suppProduit = () => {
        let deleteItem = [...document.getElementsByClassName('deleteItem'),
        ]
        let articleChoisi = [...document.querySelectorAll(`.cart__item`)]
        deleteItem.forEach((element, index) => {
        element.addEventListener('click', () => {
            sauvegardeProduitLocalStorage.splice(index, 1)
            localStorage.setItem('product',JSON.stringify(sauvegardeProduitLocalStorage)
            )
            articleChoisi[index].remove()
            panier()
            calcul();
        })
        })
        if (document.URL.includes('cart.html')) {
            if (!sauvegardeProduitLocalStorage[0]) {
                localStorage.removeItem('product')
            }
        }
    }
    suppProduit()

    function calculTotal () {
        let product = panier()
        let total = 0
        let totalQuantity = document.querySelector("#totalQuantity");
        let totalPrice = document.querySelector("#totalPrice");
        for (let i = 0; i < product.length; i++) {
            console.log (product[i].prix)
            console.log (product[i].quantity)
            let prix = product[i].prix
            let quantite = product[i].quantity
            total += prix * quantite
            totalQuantity.innerHTML = product
            totalPrice.innerHTML = total
        }
        console.log(total)
    }
    calculTotal()


    
    // Quantité totale à côté du panier (navbar)
    let cart = () => {
        let panier = document
            .getElementsByTagName('nav')[0]
            .getElementsByTagName('li')[1]
        let sauvegardeProduitLocalStorage = [] = JSON.parse(localStorage.getItem('product'))
        let somme = 0
    
        for (let q in sauvegardeProduitLocalStorage = []) {
            let quantiteBoucle = parseInt(sauvegardeProduitLocalStorage = []
                [q].quantity)
            somme += quantiteBoucle
        }

        panier.innerHTML = `Panier <span id="test" style='color: red;'>${somme}</span>`
    }