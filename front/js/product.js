//recuperer l'id du produit via l'url//
function getArticleId() {
    console.log("exécution de la fonction")
        // On obtient les paramètres de recherche dans l'url 
    return new URLSearchParams(window.location.search).get("id");

}
const id = getArticleId()

const productUrl = `http://localhost:3000/api/products/${id}`;

fetch(productUrl)
    .then((res) => res.json())
    .then((product) => {
        let img = `<img src="${product.imageUrl}"/>`
        const image = document.getElementById("itemImg");
        image.innerHTML = img
    });