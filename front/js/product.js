// Récuperer l'id du produit via l'url
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
        // Affichage de l'image du produit
        let img = `<img src="${product.imageUrl}"/>`
        const image = document.getElementById("itemImg");
        image.innerHTML = img

        // Affichage du nom du produit
        let nom = `${product.name}`
        const name = document.getElementById("title");
        name.innerHTML = nom

        // Affichage du prix du produit
        let prix = `${product.price}`
        const price = document.getElementById("price");
        price.innerHTML = prix

        // Affichage de la description du produit
        let descrip = `${product.description}`
        const description = document.getElementById("description");
        description.innerHTML = descrip

        // Affichage des couleurs disponibles du produit
        console.log(product.colors)
        let select = document.getElementById("colors");
        console.log(select)
        product.colors.forEach(color => {
            select.innerHTML += `<option value=${color}>${color}</option>`;
        });
    })