// Récuperer l'id du produit via l'url
function getArticleId() {
    console.log("exécution de la fonction")
        // On obtient les paramètres de recherche dans l'url 
    return new URLSearchParams(window.location.search).get("id");

}
const id = getArticleId()

const productUrl = `http://localhost:3000/api/products/${id}`;

fetch(productUrl)
    .then((res) => res.json())
    .then((product) => {
        // Affichage de l'image du produit
        let img = `<img src="${product.imageUrl}"/>`
        const image = document.getElementById("itemImg");
        image.innerHTML = img

        // Affichage du nom du produit
        let nom = `${product.name}`
        const name = document.getElementById("title");
        name.innerHTML = nom

        // Affichage du prix du produit
        let prix = `${product.price}`
        const price = document.getElementById("price");
        price.innerHTML = prix

        // Affichage de la description du produit
        let descrip = `${product.description}`
        const description = document.getElementById("description");
        description.innerHTML = descrip

        // Affichage des couleurs disponibles du produit
        console.log(product.colors)
        let select = document.getElementById("colors");
        console.log(select)
        product.colors.forEach(color => {
            select.innerHTML += `<option value=${color}>${color}</option>`;
        });
    })

                    //Gestion du panier

// Création du produit
let creationProduit = () => {
	let quantite = document.querySelector('#quantity')
	console.log(quantite)

	let optionProduct = {
		_id: productUrl,
		quantity: quantite.value,
		colors: colors.value,
	}

	// Mettre l'objet dans le localstorage
	let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'))

	// Ajoute un produit sélectionné dans le localStorage
	let ajoutProduitLocalStorage = () => {
		sauvegardeProduitLocalStorage.push(optionProduct)
		localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage))
	}

	// Modifie un produit sélectionné dans le localStorage
	let modifProductLocalStorage = (index) => {
		sauvegardeProduitLocalStorage[index].quantity = optionProduct.qty
		localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage))
	}

	// SI la couleur est non renseignée ou que la quantité est inférieur ou égale à 0 ou supérieure à 100 : ne rien faire
	if (
		optionProduct.colors == '' ||
		optionProduct.qty <= 0 ||
		optionProduct.qty > 100
	) {

	} else {
		// SI pas de produit dans le localStorage, crée le tableau et ajoute le produit
		if (!sauvegardeProduitLocalStorage) {
			sauvegardeProduitLocalStorage = []
			ajoutProduitLocalStorage()
			cart()
		}
		// Trouve l'index dans le localStorage qui a la même couleur & la même ID que la sélection actuelle
		else {
			let index = sauvegardeProduitLocalStorage.findIndex(
				(e) => e.colors === optionProduct.colors && e._id === optionProduct._id
			)
			// SI le produit existe déjà, modifie la quantité
			if (index !== -1) {
				modifProductLocalStorage(index)
				cart()
			}
			// SINON ajoute le produit
			else {
				ajoutProduitLocalStorage()
				console.log('Ajouter le produit')
				cart()
			}
		}
	}
}

let envoiePanier = document.querySelector('#addToCart')
envoiePanier.addEventListener('click', (event) => {
	creationProduit()
})

// Rajouter la quantité totale à côté du panier (nav bar)
let cart = () => {
	let panier = document
		.getElementsByTagName('nav')[0]
		.getElementsByTagName('li')[1]
	let sauvegardeProduitLocalStorage = [] = JSON.parse(localStorage.getItem('product'))
	let sum = 0

	for (let q in sauvegardeProduitLocalStorage = []) {
		let loop = parseInt(sauvegardeProduitLocalStorage = []
			[q].qty)
		sum += loop
	}

	panier.innerHTML = `Panier <span id="test" style='color: red;'>${sum}</span>`
}