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
		const itemsSection = document.querySelector(".item");
		
		// Insersion des détails de chaque produit dans la page Produits
			const art = document.createElement("article");
			const divImage = document.createElement("div")
			const img = document.createElement("img");
			const itemContent = document.createElement("div");
			const contentTitlePrice = document.createElement("div");
			const nom = document.createElement("h1");
			const prix = document.createElement("p");
			const contentDescrip = document.createElement("div");
			const descriptionTitle = document.createElement("p")
			const descrip = document.createElement("p")
			const contentSetting = document.createElement("div");
			const settingsColor = document.createElement("div");
			const labelColor = document.createElement("label");
			const selectColor = document.createElement("select");
			const optionColor = document.createElement("option");
			const settingQuantity = document.createElement("div");
			const labelQuantity = document.createElement("label");
			const itemQuantity = document.createElement("input");
			const contentBtn = document.createElement("div");
			const btn = document.createElement("button");

			
			divImage.classList.add("item__img");
			img.classList.add("alt");
			img.src = `/images/logo.png`;
			img.src = product.imageUrl;
			img.alt = product.altTxt;
			itemContent.classList.add("item__content");
			
			contentTitlePrice.classList.add("item__content__titlePrice");
			nom.innerText = product.name;
			prix.textContent = "Prix : ", 
			prix.innerText = product.price;
			contentDescrip.classList.add("item__content__description");
			contentDescrip.textContent = "Description :";
			descriptionTitle.classList.add("item__content__description__title");
			descrip.innerText = product.description;
			contentSetting.classList.add("item__content__settings");
			settingsColor.classList.add("item__content__settings__color");
			labelColor.textContent = "Choisir une couleur :";
			selectColor.innerText = product.colors;
			optionColor.setAttribute("value", "");
			optionColor.textContent = "SVP, choisissez une couleur " 
			settingQuantity.classList.add("item__content__settings__quantity");
			labelQuantity.textContent = "Nombre d'article(s) (1-100) :";
			itemQuantity.setAttribute("type", "number", "name", "min", "1", "max", "100", "value", "0");
			contentBtn.classList.add("item__content__addButton");
			btn.textContent = "Ajouter au panier";

			itemsSection.appendChild(art);
			art.append(divImage, img);
			art.appendChild(itemContent);
			itemContent.appendChild(contentTitlePrice);
			contentTitlePrice.append(nom, prix);
			itemContent.appendChild(contentDescrip);
			contentDescrip.append(descriptionTitle, descrip);
			itemContent.appendChild(contentSetting);
			contentSetting.appendChild(settingsColor);
			settingsColor.append(labelColor, selectColor, optionColor);
			contentSetting.appendChild(settingQuantity);
			settingQuantity.append(labelQuantity, itemQuantity);
			itemContent.appendChild(contentBtn);
			contentBtn.appendChild(btn);

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