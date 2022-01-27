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
		console.log(product);

		// SELECTEURS
		const titleDiv = document.querySelector('#title');
		const priceDiv = document.querySelector('#price');
		const descriptionDiv = document.querySelector('#description');

		/// GESTION DE L'IMAGE
		const imageContainer = document.querySelector('#itemImg');
		const imgDiv = document.createElement('img');
		imgDiv.src = product.imageUrl;
		imgDiv.alt = product.altTxt;
		imageContainer.appendChild(imgDiv);

		// AFFICHAGE DES INFOS TEXTUELLES
		titleDiv.innerText = product.name;
		priceDiv.innerText = product.price;
		descriptionDiv.innerText = product.description;

		// GESTION DU MENU DÉROULANT
		const select = document.querySelector('select');
		product.colors.forEach(clr => {
			console.log(clr);
			// ici faudra créér un élément option dans la boucle
			const selectOption = document.createElement('option');
			// lui attribuer la valeur de clr (value)
			selectOption.setAttribute('value', clr);
			// lui faire un innertext de clr
			selectOption.innerText = clr;
			// le faire exister dans le dom grâce au select au dessus
			select.appendChild(selectOption);
		});
	});
		
// Ajouter des produits dans le panier
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
		console.log('Modification de la quantité')
	}
		// Si le produit n'est pas présent dans le panier, ajout dans le produit
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
				console.log('Produit ajouté au panier dans le local storage')
			}
		}
}

let envoiePanier = document.querySelector('#addToCart')
envoiePanier.addEventListener('click', (event) => {
	creationProduit()
	console.log("bouton Ajouter au panier")
})