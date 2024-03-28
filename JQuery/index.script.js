import { security } from "./security.script.js";

security();

$(document).ready(function () {
    var lienAjouterAuPanier = $("article .btn-primary");

    lienAjouterAuPanier.click(function () {
        var articleParent = $(this).closest('article');
        var nomArticle = articleParent.find('.card-title');
        var prixArticle = articleParent.find('.card-price');
        var imageArticle = articleParent.find('.card-img-top');
        var lienImage = imageArticle.attr('src');

        var panier = new Array;

        var article = [{
            nom: nomArticle.text(),
            prix: prixArticle.text(),
            qte: 1,
            lien: lienImage
        }];

        if (localStorage.getItem("panier")) {
            panier = JSON.parse(localStorage.getItem("panier"));
            panier.push(article);

            localStorage.setItem("panier", JSON.stringify(panier));
            window.location.href = "./index.html";
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Votre article a été ajouter au panier !',
              });
        } else {
            panier.push(article);

            localStorage.setItem("panier", JSON.stringify(panier));
            window.location.href = "./index.html";
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Votre article a été ajouter au panier !',
              });
        }
    })
});