$(document).ready(function() {



    $("body").on("focus", "input", function(event) {
        $(this).attr('autocomplete', 'on')
    });


    // leemos los favoritos del localStorage
    var favoritos = localStorage.getItem("favoritos") || "[]";
    favoritos = JSON.parse(favoritos);

    // para cada producto en favoritos
    for (var x = 0; x < favoritos.length; x++) {

        // con un enlace al producto

        $("#" + x).attr("visible", "show");

    }

    $("a[id^='agregar-favoritos']").click(
        function(e) {

            // hacemos que no se ejecute el enlace
            e.preventDefault();

            // leemos los datos clave del producto y los guardamos en un objeto

            var listid = $(this).attr("name");

            var identi = $(this).attr("id");
            identi = identi.substring(identi.indexOf("_") + 1);
            var datos = {
                id: listid,
                nombre: $("#" + identi).attr('visible')
            };

            // leemos los favoritos del localStorage
            var favoritos = localStorage.getItem("favoritos") || "[]";
            favoritos = JSON.parse(favoritos);

            // buscamos el producto en la lista de favoritos
            var posLista = favoritos.findIndex(function(e) {
                return e.id == datos.id;
            });
            if (posLista > -1) {

                // si está, lo quitamos
                favoritos.splice(posLista, 1);
                $("#" + identi).attr('visible', "hide");
            } else {
                // si no está, lo añadimos

                $("#" + identi).attr('visible', "show");
                favoritos.push(datos);
            }

            // guardamos la lista de favoritos 
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

        }


    );


});

$('#favorito').click(function(e) {
    var filtvalue = "show";


    $("#theList").find("li").each(function(idx) {
        //get filter text
        var filtText = $(this).attr("visible");

        if (filtText != undefined && filtText == "show") {

            $(this).show();
        } else {
            $(this).hide();
        }
    });

});
$('#todos').click(function(e) {
    var filtvalue = "hide";


    $("#theList").find("li").each(function(idx) {
        //get filter text
        var filtText = $(this).attr("visible");

        if (filtText != undefined && filtText == "hide") {

            $(this).hide();
        } else {
            $(this).show();
        }
    });
});