export function security() {
    if (localStorage.getItem("currentUser")) {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        var initialName = currentUser.name[0];

        $("#authentify").css("display", "flex");
        $("#authentify .circle .initial").text(initialName);
        $("#notAuthentify").css("display", "none");
    }
}
