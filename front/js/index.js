// INSERER LES PRODUITS DANS LA PAGE D'ACCUEIL

// Requête de l'API pour lui demander l'ensemble des produits
const allProductsURL = "http://localhost:3000/api/products";
fetch(allProductsURL)
// Récupération de la réponse émise
    .then((res) => res.json())
    .then((res) => {
        // Récupération de l'ensemble des produits
        console.log(res)
        // Parcours de la réponse
        const itemsSection = document.querySelector("#items");
        res.forEach((el) => {
            // Récupèration de l'ID de chaque produit
            console.log(el._id)

            // Insersion de chaque produit dans la page d'accueil
            
            // Constantes pour créer des éléments HTML avec la méthode "document.createElement"
            const a = document.createElement("a");
            const section = document.createElement("article");
            const img = document.createElement("img");
            const titre = document.createElement("h3");
            const para = document.createElement("p");

            // Ajout de leur class (avec classList.add), d'un texte (innerText) ou d'un attribut
            section.classList.add("items");
            img.classList.add("alt");
            titre.classList.add("productName")
            para.classList.add("productDescription")

            a.href = `./product.html?id=${el._id}`;
            img.alt = el.altTxt;
            img.src = el.imageUrl;
            titre.innerText = el.name;
            para.innerText= el.description;
            
            // Apparition dans le DOM et affichage des produits dans la page d'accueil
            itemsSection.appendChild(a)
            a.appendChild(section);
            section.append(img, titre, para);
        });
    });