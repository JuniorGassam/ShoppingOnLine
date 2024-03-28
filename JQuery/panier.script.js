import { security } from "./security.script.js";

security();

$(document).ready(function () {
    // mode nuit/jour
    $('#toggleMode').click(function () {
        $('body').toggleClass('dark-mode');
        $("table").attr("class", "table table-dark")
    });

    var tableauArticles = $("tbody");
    var panier = JSON.parse(localStorage.getItem("panier"));
    var tr = ``;

    // afficher les articles du panier
    panier.forEach(article => {
        var position = panier.findIndex(function (element) {
            return element[0].nom === article[0].nom;
        });
        tr = `
            <tr>
                <td>${position + 1}</td>
                <td class="nom">${article[0].nom}</td>
                <td class="imageItem"><img class="card-img-top" src="../.${article[0].lien}" alt="Card image cap"></td>
                <td class="price">${article[0].prix}</td>
                <td><input type="number" class="number" max="10" min="1" placeholder="1" class="form-control"></td>
                <td><button type="button" class="btn btn-primary btn-sm"><svg style="margin-right: 5px;"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-trash" viewBox="0 0 16 16">
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>Retirer du panier</button></td>
            </tr>
        `;

        tableauArticles.append(tr);
    });

    tableauArticles.append(`
        <tr>
            <td></td>
            <td class="nom"></td>
            <td class="imageItem"></td>
            <td><strong>Prix Total : </strong></td>
            <td><h3 class="totalPrice"><strong></strong></h3></td>
            <td>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                Commander
                </button>
            </td>
        </tr>
    `);


    // retirer un article du panier
    $("button").click(function () {
        var article = $(this).closest('tr');
        var nom = article.find(".nom");

        panier.forEach(element => {
            if (element[0].nom == nom.text()) {
                var nouveauPanier = panier.filter(function (element) {
                    return element[0].nom !== nom.text();
                });
                localStorage.setItem("panier", JSON.stringify(nouveauPanier));
                article.remove();
            }
        });
    });


    // enregistrement des quantités
    $(".number").focusout(function () {
        var article = $(this).closest('tr');
        var nom = article.find(".nom");
        var totalPrice = 0;

        panier.forEach(element => {
            if (element[0].nom == nom.text()) {
                element[0].qte = $(this).val();
            }
        });

        panier.forEach(element => {
            totalPrice += (parseFloat((element[0].prix).split(" €"))) * (parseFloat((element[0].qte)));
            $(".totalPrice").text(totalPrice + " €");
        });
    });

    // calcul et affichage du prix total
    var totalPrice = 0;
    panier.forEach(element => {
        totalPrice += parseFloat((element[0].prix).split(" €"));
    });
    $(".totalPrice").text(totalPrice + " €");


    // vider le panier
    $("#deleteAll").click(function(){
        var panier = new Array;
        localStorage.setItem("panier",JSON.stringify(panier));
        location.reload();
    });

    if(JSON.parse(localStorage.getItem("panier")).length == 0){
        $("#deleteAll").css("display", "none");
    }


});