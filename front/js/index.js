// Insérer les produits dans la page d'accueil

// Requête de l'API pour lui demander l'ensemble des produits
const allProductsURL = "http://localhost:3000/api/products";
fetch(allProductsURL)
// Récupération de la réponse émise
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        // Parcours de la réponse
        const itemsSection = document.querySelector("#items");
        res.forEach((el) => {
            console.log(el._id)
            // Insersion de chaque produit dans la page d'accueil
            const a = document.createElement("a");
            const section = document.createElement("article");
            const img = document.createElement("img");
            const titre = document.createElement("h3");
            const para = document.createElement("p");

            section.classList.add("items");
            img.classList.add("alt");
            titre.classList.add("productName")
            para.classList.add("productDescription")

            img.alt = el.altTxt;
            img.src = el.imageUrl;
            titre.innerText = el.name;
            para.innerText= el.description;
            
            itemsSection.appendChild(a)
            a.appendChild(section);
            section.append(img, titre, para);
        });
    });