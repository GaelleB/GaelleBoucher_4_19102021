//recuperer l'id du produit via l'url//
function getArticleId() {

    // On obtient les paramètres de recherche dans l'url (relire la documentation mdn si nécessaire)
    let searchParams = new URLSearchParams(window.location.search);

    // On récupère l'id qui est dans les paramètres grâce à la méthode .get
    const id = searchParams.get("id");

    // On construit l'URL qui permet de voir les détails d'un produit dans le backend grâce à l'id récupéré
    const productUrl = `http://localhost:3000/api/pr
//affichage des produitds sur la page d'accueuil//

const allProductsURL = "http://localhost:3000/api/products";

fetch(allProductsURL)
.then((res) => res.json())
.then((res) => {
const itemsSection = document.querySelector("#items");
res.forEach((el) => {
const itemLink = document.createElement("a");
itemLink.href = `. / product.html ? id = $ { el._id }
    `;
itemLink.innerHTML = ` < article >
        <
        img src = $ { el.imageUrl }
    alt = $ { el.altTxt } >
        <
        h3 >