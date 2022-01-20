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
            const itemLink = document.createElement("a");
            itemLink.href = `./product.html?id=${el._id}`;
            itemLink.innerHTML = ` <article>
                            <img src = ${el.imageUrl} alt = ${el.altTxt}>
                            <h3 class = "productName"> ${el.name} </h3> 
                            <p class = "productDescription"> ${el.description} </p> 
                            </article> `;
            itemsSection.appendChild(itemLink);
            return itemLink;
        });
    });