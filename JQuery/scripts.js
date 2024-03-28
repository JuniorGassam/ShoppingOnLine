$(document).ready(function () {
  $('#toggleMode').click(function () {
    $('body').toggleClass('dark-mode');
  });

  $(".card").hover(function () {
    $(this).children().eq(1).show().animate({ width: '-=18%' }, 1000);
  }, function () {
    $(this).children().eq(1).hide().animate({ width: '+=18%' }, 1000);
  });

  $(".seeMore").click(function () {
    var contenu = $(this).next();
    var visibility = contenu.children().eq(1).css("display");
    if (visibility == "none") {
      contenu.children().eq(1).show();
      $(this).text("Voir moins");
    } else {
      contenu.children().eq(1).hide();
      $(this).text("Voir plus");
    }
  })

  if ((JSON.parse(localStorage.getItem("panier"))).length == 0) {
    $("#articleNumber").css("display", "none");
  }else{
    $("#articleNumber").css("display", "flex");
  }

});