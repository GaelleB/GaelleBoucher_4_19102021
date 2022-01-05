// Insérer les produits dans la page d’accueil

const allProductsURL = "http://localhost:3000/api/products";

fetch(allProductsURL)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        const itemsSection = document.querySelector("#items");
        res.forEach((el) => {
            console.log(el._id)
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