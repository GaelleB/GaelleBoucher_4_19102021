//recuperer l'id du produit via l'url//
function getArticleId() {
    // On obtient les paramètres de recherche dans l'url 
    let searchParams = new URLSearchParams(window.location.search);

    // On récupère l'id qui est dans les paramètres grâce à la méthode .get
    const id = searchParams.get("id");

    // On construit l'URL qui permet de voir les détails d'un produit dans le backend grâce à l'id récupéré
    const productUrl = "http://localhost:3000/api/products/${id}";

    // On utilise la dite URL pour fetch depuis le backend les détails d'un produit
    fetch(productUrl)
        .then((res) => res.json())
        .then((product) => {
            // Extraire les détails l'ID des produits sur la page produits
            const itemsSection = document.querySelector(".items");
        });
}