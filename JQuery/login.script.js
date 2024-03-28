$(document).ready(function () {
  $('.paragraphe1').click(function () {
    $('#connexion').hide();
    $('#inscription').show();
  });

  $("img").fadeTo(1000, 0.8)
    .fadeTo(2000, 1);

  // Utilisation du plugin
  $('#inscription').formulaireInscription({
    // url: '../../data/customers.save.data.php',
    onSuccess: function () {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Inscription réussie !',
      });
      // window.location.href = "./Login.html";
    },
    onError: function (message) {
      alert('Erreur: ' + message);
    }
  });


  // connexion 
  $('#connexion').submit(function (event) {
    event.preventDefault();

    if (localStorage.getItem("users")) {
      var users = JSON.parse(localStorage.getItem("users"));
      var username = $('#nom').val();
      var password = $('#password').val();
      var authentify = false;

      users.forEach(element => {
        if (element.name == username && element.password == password) {
          authentify = true;
          var currentUser = {
            name: element.name,
            password: element.password
          }
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          window.location.href = "../../index.html";
        }
      });

      if (authentify == false) {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect',
          text: "Nom d'utilisateur ou mot de passe incorrect",
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Incorrect',
        text: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }
  });


});


// Plugin jQuery pour la gestion du formulaire
(function ($) {
  $.fn.formulaireInscription = function (options) {

    // Options par défaut
    var settings = $.extend({
      // url: 'url_par_defaut',
      onSuccess: function () { },
      onError: function () { }
    }, options);

    // Fonction de validation du formulaire
    function validerFormulaire() {
      var formulaire = $(this);
      var form = document.getElementById('inscription');
      var username = $('#username').val();
      var email = $('#email').val();
      var password = $('#passwordInscription').val();

      if (username === '' || email === '' || password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Veuillez remplir tous les champs',
        });
        return false;
      }

      // Vérifier si l'email a un format valide
      var email = formulaire.find('[name="email"]').val();
      var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Email invalide',
        });
        return false;
      }

      var formData = {};
      var formFields = form.querySelectorAll('input');
      formFields.forEach(function (field) {
        formData[field.name] = field.value;
      });

      // Si toutes les validations passent, envoyer les données
      enregistrerDonnees(formData);
      return false; // Empêche le formulaire de se soumettre normalement
    }

    // Fonction pour enregistrer les données
    function enregistrerDonnees(data) {

      if (localStorage.getItem("users")) {

        var users = JSON.parse(localStorage.getItem("users"));
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));

      } else {

        var users = new Array;
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));

      }

      $.ajax({
        // url: settings.url,
        type: 'GET',
        // data: JSON.stringify(data),
        // contentType: 'application/json',
        success: function () {
          console.log("Reponse du serveur: " + JSON.stringify(data));
          settings.onSuccess();
        },
        error: function () {
          settings.onError('Erreur lors de l\'enregistrement');
        }
      });
    }

    // Attacher la fonction de validation au formulaire
    this.on('submit', validerFormulaire);

    // Retourner l'objet jQuery pour permettre la chaîne des appels
    return this;
  };
}(jQuery));