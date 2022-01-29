// AFFICHER UN TABLEAU RECAPITULATIF DES ACHATS DANS LA PAGE PANIER

// Récupère le panier via le localStorage
let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'));
let sauvegardeContactLocalStorage = JSON.parse(localStorage.getItem('contact'));


function panier() {
	let check = localStorage.getItem('product');
	if (check) {
		return JSON.parse(localStorage.getItem('product'));
	} else {
		let titre = document.querySelector('h1');
		titre.innerText = "Votre panier est vide";
		return [];
	}
}
panier();


// Parcours du panier + création et insersion des éléments dans la page Panier
function affichagePanier() {
	let sauvegardeProduitLocalStorage = panier();
	for (let i = 0; i < sauvegardeProduitLocalStorage.length; i++) {

		// Sélecteur
		const sectionCartItems = document.querySelector("#cart__items");

		// Gestion de la balise HTML <article>
		const art = document.createElement("article");
		art.classList.add("cart__item");
		art.setAttribute("data-id", sauvegardeProduitLocalStorage[i].id);

		// Gestion de l'image
		const divImage = document.createElement("div");
		divImage.classList.add("cart__item__img");
		const image = document.createElement("img");
		image.classList.add("alt");
		image.src = (sauvegardeProduitLocalStorage[i].img);
		image.alt = (sauvegardeProduitLocalStorage[i].alt);

		// Gestion du div "cart__item__content"
		const itemContent = document.createElement("div");
		itemContent.classList.add("cart__item__content");
		
		// Gestion du nom et du prix
		const contentTitlePrice = document.createElement("div")
		const nom = document.createElement("h2");
		const prix = document.createElement("p");
		contentTitlePrice.classList.add("cart__item__content__titlePrice");
		nom.textContent = (sauvegardeProduitLocalStorage[i].nom);
		prix.textContent = (sauvegardeProduitLocalStorage[i].prix);

		// Gestion du div "cart__item__content__settings"
		const contentSetting = document.createElement("div");
		contentSetting.classList.add("cart__item__content__settings");
		
		// Gestion de la quantité
		const settingQuantity = document.createElement("div");
		const quantity = document.createElement("p");
		const input = document.createElement("input");
		quantity.textContent = "Qté : ";
		settingQuantity.classList.add("cart__item__content__settings__quantity");
		input.classList.add("itemQuantity");
		input.setAttribute("type", "number");
		input.setAttribute("name", "itemQuantity");
		input.setAttribute("min", "1")
		input.setAttribute("max", "100")
		input.setAttribute("value", sauvegardeProduitLocalStorage[i].quantity)
		
		// Gestion du bouton supprimer
		const settingDelete = document.createElement("div");
		const suppr = document.createElement("p");
		settingDelete.classList.add("cart__item__content__settings__delete");
		suppr.classList.add("deleteItem")
		suppr.textContent = "Supprimer";

		// Apparition dans le DOM et affichage dans la page panier
		sectionCartItems.appendChild(art);
		art.appendChild(divImage);
		divImage.appendChild(image);
		art.appendChild(itemContent);
		itemContent.appendChild(contentTitlePrice);
		contentTitlePrice.appendChild(nom);
		nom.appendChild(prix);
		itemContent.appendChild(contentSetting);
		contentSetting.appendChild(settingQuantity);
		settingQuantity.appendChild(quantity);
		quantity.appendChild(input);
		contentSetting.appendChild(settingDelete);
		settingDelete.appendChild(suppr);
	}
}
affichagePanier();

// GERER LA MODIFICATION ET LA SUPPRESSION DE PRODUITS DANS LA PAGE PANIER

// Modification de la quantité d'un produit
let modifProduit = () => {
	let itemQuantity = [...document.getElementsByClassName('itemQuantity'),
	];
	itemQuantity.forEach((item, index) => {
		item.addEventListener('click', () => {
			sauvegardeProduitLocalStorage[index].quantity = itemQuantity[index].value;
			localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage)
			);
			panier();
			calculTotal();
		});
	});
};
modifProduit();

// Suppression d'un produit
let suppProduit = () => {
	let deleteItem = [...document.getElementsByClassName('deleteItem')];
	let articleChoisi = [...document.querySelectorAll(`.cart__item`)];
	deleteItem.forEach((element, index) => {
		element.addEventListener('click', () => {
			let id = articleChoisi[index].dataset.id;
			let color = articleChoisi[index].dataset.color;
			sauvegardeProduitLocalStorage = sauvegardeProduitLocalStorage.filter(e => e._id !== id || e.colors !== color);
			localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage));
			articleChoisi[index].remove();
			panier();
			calculTotal();
		});
	});
	if (document.URL.includes('cart.html')) {
		if (!sauvegardeProduitLocalStorage[0]) {
			localStorage.removeItem('product');
		}
	}
};
suppProduit();

// Calcul total
function calculTotal() {
	let totalQuantity = document.querySelector("#totalQuantity");
	let totalPrice = document.querySelector("#totalPrice");
	let product = panier();
	let total = 0;
	let quantite = 0;
	let allQuantite = 0;
	
	for (let i = 0; i < product.length; i++) {
		let prix = Number(product[i].prix);
		quantite = Number(product[i].quantity);
		total += prix * quantite;
		allQuantite += Number(product[i].quantity);
	}
		totalQuantity.innerText = allQuantite;
		totalPrice.innerHTML = total;

	// PASSER LA COMMANDE
	addEventListener('change', () => {
		function firstName() {
			let firstName = document.getElementById('firstName').value;
			let text = document.getElementById('firstNameErrorMsg');
			let regEx1 = /^[a-zA-Zéèàêë\-]+$/;
			let number = /^[a-zA-Z\-1-9]+$/;

			if (firstName.match(regEx1)) {
				text.innerHTML = 'Prénom valide';
				return firstName;
			} else {
				if (firstName.match(number)) {
					text.innerHTML = 'Les chiffres ne sont pas tolérés';
				} else {
					text.innerHTML = 'Merci de rentrer un prénom valide';
				}
			}
			if (firstName == '') {
				text.innerHTML = '';
			}
		}
		firstName();

		function lastName() {
			let lastName = document.getElementById('lastName').value;
			let text = document.getElementById('lastNameErrorMsg');
			let regEx2 = /^\s*[a-zA-Zéèàê]+\s*$/;
			let number = /^[a-zA-Z\-1-9]+$/;

			if (lastName.match(regEx2)) {
				text.innerHTML = 'Nom valide';
				return lastName;
			} else {
				if (lastName.match(number)) {
					text.innerHTML = 'Les chiffres ne sont pas tolérés';
				} else {
					text.innerHTML = 'Merci de rentrer un nom valide';
				}
			}
			if (lastName == '') {
				text.innerHTML = '';
			}
		}
		lastName();

		function adress() {
			let address = document.getElementById('address').value;
			let text = document.getElementById('addressErrorMsg');
			let regEx3 = '([0-9a-zA-Z,. ]*) ?([0-9]{5}) ?([a-zA-Z]*)';

			if (address.match(regEx3)) {
				text.innerHTML = 'Adresse postale valide';
				return address;
			} else {
				text.innerHTML =
					'Merci de rentrer une adresse valide : numéro voie code postal';
			}
			if (address == '') {
				text.innerHTML = '';
			}
		}
		adress();

		function city() {
			let city = document.getElementById('city').value;
			let text = document.getElementById('cityErrorMsg');
			let regEx4 = /^[a-z ,.'-]+$/i;

			if (city.match(regEx4)) {
				text.innerHTML = 'Ville valide';
				return city;
			} else {
				text.innerHTML = 'Merci de rentrer une ville valide';
			}
			if (city == '') {
				text.innerHTML = '';
			}
		}
		city();

		function mail() {
			let mail = document.getElementById('email').value;
			let text = document.getElementById('emailErrorMsg');
			let regEx5 = new RegExp(
				'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
				'g'
			);

			if (mail.match(regEx5)) {
				text.innerHTML = 'Adresse email valide';
				return mail;
			} else {
				text.innerHTML = 'Merci de rentrer une adresse valide';
			}
			if (mail == '') {
				text.innerHTML = '';
			}
		}
		mail();

		// Bouton commander pour envoyer la commande dans localStorage
		let sendContact = document.querySelector('#order');
		sendContact.addEventListener('click', (e) => {
			console.log("bouton commander")
			e.preventDefault();

			// Constitution d'un objet contact (à partir des données du formulaire)
			let contact = {
				firstName: firstName(),
				lastName: lastName(),
				address: adress(),
				city: city(),
				email: mail(),
			};

			// Ajoute le nouveau contact
			let ajoutContactLocalStorage = () => {
				sauvegardeContactLocalStorage = [];
				sauvegardeContactLocalStorage.push(contact);
				localStorage.setItem(
					'contact',
					JSON.stringify(sauvegardeContactLocalStorage)
				);
			};

			// Modifie le contact
			let modifContactLocalStorage = () => {
				sauvegardeContactLocalStorage = contact;
				localStorage.setItem(
					'contact',
					JSON.stringify(sauvegardeContactLocalStorage)
				);
			};

			// Si l'objet a une key non définie, ne pas exécuter le code
			if (
				contact.firstName == undefined ||
				contact.lastName == undefined ||
				contact.address == undefined ||
				contact.city == undefined ||
				contact.email == undefined
			) {
				return false;
			} else {
				// SI pas de contact dans le localStorage, crée un tableau
				if (!sauvegardeContactLocalStorage) {
					ajoutContactLocalStorage();
				}
				// Modifie le contact en temps réel
				else {
					modifContactLocalStorage();
				}
			}

			// Constitution d'un tableau de produits
			const products = []
			product.forEach(kanap => products.push(kanap._id));

			// Requête POST sur l'API
			fetch('http://localhost:3000/api/products/order', {
				method: 'POST',
				body: JSON.stringify({contact, products}),
				headers: {
					'Content-type': 'application/json',
				},
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					console.log('Commande échouée');
				}
			})
			.then(order => { 
				console.log(order);
				let orderId = order.orderId
				// L'utilisateur sera redirigé vers la page Confirmation en passant l'id de commande dans l'URL pour afficher le numéro de commande
				window.location = `${window.location.origin}/front/html/confirmation.html?id=${orderId}`;
			});
		});
	})
}
calculTotal();