    $(document).ready(function() {

            $("body ").on("focus", "input", function(event) {
                $(this).attr('autocomplete', 'on')
            });

            var favoritos = localStorage.getItem("favoritos") || "[] ";
            favoritos = JSON.parse(favoritos);

            for (var j = 0; j < favoritos.length; j++) {
                //get filter text
                var posGeneral = favoritos[j].id;
                var nomb = favoritos[j].nombre;

                $("#" + posGeneral).show();
                $("#" + "agregar-favoritos_" + posGeneral).attr("class", "ui-btn ui-btn-icon-notext ui-icon-star ui-btn-a");
            }


            $("a[id^='agregar-favoritos' ] ").click(
                function(e) {

                    // hacemos que no se ejecute el enlace
                    e.preventDefault();

                    // leemos los datos clave del producto y los guardamos en un objeto


                    var identi = $(this).attr("id");
                    identi = identi.substring(identi.indexOf("_") + 1);

                    var datos = {
                        id: identi,
                        nombre: $("#" + identi).attr('visible')
                    };

                    // leemos los favoritos del localStorage
                    var favoritos = localStorage.getItem("favoritos") || "[] ";
                    favoritos = JSON.parse(favoritos);

                    // buscamos el producto en la lista de favoritos
                    var posLista = favoritos.findIndex(function(e) {

                        return e.id == identi;
                    });
                    if (posLista > -1) {

                        // si está, lo quitamos
                        alertify.error("eliminado de favoritos ");
                        $("#fila_" + identi).hide();

                        favoritos.splice(posLista, 1);

                    } else {
                        // si no está, lo añadimos
                        $("#agregar-favoritos_" + identi).attr("class", "ui-btn ui-btn-icon-notext ui-icon-star ui-btn-a");
                        alertify.success("añadido favoritos");

                        // $("# " + identi).show();


                        favoritos.push(datos);
                    }

                    // guardamos la lista de favoritos 
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));

                }


            );


        });

        $('#favorito').click(function(e) {
            var filtvalue = "show";
            var favoritos = localStorage.getItem("favoritos") || "[] ";
            favoritos = JSON.parse(favoritos);

            $("li[id^='fila_' ] ").hide();

            for (var j = 0; j < favoritos.length; j++) {
                $("#fila_" + favoritos[j].id).show();
                $("#agregar-favoritos_" + favoritos[j].id).attr("class", "ui-btn ui-btn-icon-notext ui-icon-star ui-btn-a ");
            }

            $("li[id^='contenedor_' ] ").each(function() {
                var numerofavoritos = 0;


                $(this).find("li").each(function() {
                    var iden = $(this).attr("id");
                    iden = iden.substring(iden.indexOf("_") + 1);
                    var encontrado = false;
                    for (var i = 0; i < favoritos.length && !encontrado; i++) {
                        encontrado = favoritos[i].id == iden;
                    }
                    if (encontrado) {
                        numerofavoritos++;
                    }

                });
                if (numerofavoritos == 0) {
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
