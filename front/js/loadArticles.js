//affichage des produitds sur la page d'accueuil//

const allProductsURL = 'http://localhost:3000/api/products'

fetch(allProductsURL)
    .then(res => res.json())
    .then(res => {

        const itemsSection = document.querySelector('#items');
        res.forEach((el) => {

            const itemLink = document.createElement('a');
            itemLink.href = `./front/html/product.html?id=${el._id}`
            itemLink.innerHTML = `<article>
                    <img src= ${el.imageUrl} alt =${el.altTxt}>
                    <h3 class="productName"> ${el.name} </h3> 
                    <p class="productDescription"> ${el.description} </p>
                    </article >`
            itemsSection.appendChild(itemLink)
            return itemLink
        })
    })


//recuperer l'id du produit via l'url//
function getArticleId() {
    return new URL.searchParams.get("id");
}
const id = getArticleId()