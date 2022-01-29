// FAIRE LE LIEN ENTRE UN PRODUIT DE LA PAGE D'ACCUEIL ET LA PAGE PRODUIT

// Utilisation de la notion "URLSearchParams" pour savoir lequel des différents produits de l'API à afficher
function getArticleId() {
	// RECUPERATION DE L'ID DU PRODUIT
    return new URLSearchParams(window.location.search).get("id");
}
const id = getArticleId()

// INSERER UN PRODUIT ET SES DETAILS DANS LA PAGE PRODUIT 

// Interrogation de l'API pour récupérer les détails du produit
const productUrl = `http://localhost:3000/api/products/${id}`;
fetch(productUrl)
	.then((res) => res.json())
	.then((product) => {
		// Récupération des détails de chaque produit
		console.log(product);

		// Insersion d'un produit et de ses détails dans la page produit
		// Sélecteurs
		const titleDiv = document.querySelector('#title');
		const priceDiv = document.querySelector('#price');
		const descriptionDiv = document.querySelector('#description');

		/// Gestion de l'image
		const imageContainer = document.querySelector('#itemImg');
		const imgDiv = document.createElement('img');
		imgDiv.src = product.imageUrl;
		imgDiv.alt = product.altTxt;
		imageContainer.appendChild(imgDiv);

		// Affichage des informations textuelles
		titleDiv.innerText = product.name;
		priceDiv.innerText = product.price;
		descriptionDiv.innerText = product.description;

		// Gestion du menu déroulant des couleurs
		const select = document.querySelector('select');
		product.colors.forEach(clr => {
			console.log(clr);
			// créér un élément option dans la boucle
			const selectOption = document.createElement('option');
			// lui attribuer la valeur de clr (value)
			selectOption.setAttribute('value', clr);
			// lui faire un innertext de clr
			selectOption.innerText = clr;
			// le faire exister dans le dom
			select.appendChild(selectOption);
		});
	});
		
// AJOUTER DES PRODUITS DANS LE PANIER

// Création d'un objet produit
let creationProduit = () => {
	let quantite = document.querySelector('#quantity')
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
		// Si le produit n'est pas présent dans le panier, l'ajouter dans le panier
		if (!sauvegardeProduitLocalStorage) {
			sauvegardeProduitLocalStorage = []
			ajoutProduitLocalStorage()
		}
			else {
			let index = sauvegardeProduitLocalStorage.findIndex(
				(e) => e.colors === optionProduct.colors && e._id === optionProduct._id
			)
			// Si le produit existe déjà, on incrémente la quantité correspondant dans le panier
			if (index !== -1) {
				modifProductLocalStorage(index)
			}
			// Sinon on ajoute le produit
			else {
				ajoutProduitLocalStorage()
			}
		}
}

// Bouton "Ajouter au panier"
let envoiePanier = document.querySelector('#addToCart')
envoiePanier.addEventListener('click', (event) => {
	creationProduit()
	console.log("Ajouter au panier")
})