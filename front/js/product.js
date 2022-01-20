// Faire le lien entre un produit de la page d’accueil et la page Produit avec la notion "URLSearchParams"
function getArticleId() {
	// Récupérer l’id du produit à afficher
    return new URLSearchParams(window.location.search).get("id");
}
const id = getArticleId()

// Insérer un produit et ses détails dans la page Produit dans le DOM en interrogeant l'API
const productUrl = `http://localhost:3000/api/products/${id}`;
fetch(productUrl)
    .then((res) => res.json())
    .then((product) => {
		console.log(product)
        // Affichage de l'image du produit
        let img = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`
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

// Ajouter des produits dans le panier
let creationProduit = () => {
	let quantite = document.querySelector('#quantity')
	console.log(quantite)
	let name = document.querySelector("#title").innerText
	let prix = document.querySelector("#price").innerText
	let image = document.querySelector("#itemImg img")

// Composition de l'array
	let optionProduct = {
		_id: id,
		quantity: Number(quantite.value),
		colors: colors.value,
		nom: name,
		prix: Number(prix),
		img: image.src,
		alt: image.alt
	}

	// Utilisation du localstorage pour accéder à l'array depuis la page Panier
	let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'))

	// Ajoute un produit sélectionné dans le localStorage
	let ajoutProduitLocalStorage = () => {
		sauvegardeProduitLocalStorage.push(optionProduct)
		localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage))
	}
	// Modifie un produit sélectionné dans le localStorage
	let modifProductLocalStorage = (index) => {
		sauvegardeProduitLocalStorage[index].quantity = optionProduct.quantity
		localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage))
		}
		// Si le produit n'est pas présent dans le panier, ajoute le produit
		if (!sauvegardeProduitLocalStorage) {
			sauvegardeProduitLocalStorage = []
			ajoutProduitLocalStorage()
		}
				else {
			let index = sauvegardeProduitLocalStorage.findIndex(
				(e) => e.colors === optionProduct.colors && e._id === optionProduct._id
			)
			// Si le produit existe déjà, on incrémente la quantité correspondant dans l'array
			if (index !== -1) {
				modifProductLocalStorage(index)
			}
			// Sinon on ajoute le produit
			else {
				ajoutProduitLocalStorage()
			}
		}
}

let envoiePanier = document.querySelector('#addToCart')
envoiePanier.addEventListener('click', (event) => {
	creationProduit()
})