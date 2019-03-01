(function(){


    new STORE.DOMObjectLook("op_verProducto");
    new STORE.DOMObjectLook("op_verCarrito");

    var ajax = STORE.Ajax;
    var llamada;
    var modelXPage = 6;
    sessionStorage.setItem("pag",0);

    if(sessionStorage.getItem("produtosCargados")!= "undefined"){

        llamada = new ajax.CargadorContenidos("/getProducts", function () {
            var i = 0;
            var estado = JSON.parse(llamada.req.responseText);

            estado.forEach(function (model) {
                localStorage.setItem("model"+i, JSON.stringify(model));
                i++;
            });

            sessionStorage.setItem("restoPagina",i % modelXPage);

            sessionStorage.setItem("totalPagina",i);

            sessionStorage.setItem("produtosCargados","si");

            alert("pag:" + sessionStorage.getItem("totalPagina") + "Resto:" + sessionStorage.getItem("restoPagina"));
        });
    }

    STORE.namespace('STORE.Carrito.carruselProducto');
    STORE.namespace('STORE.Carrito.formVerProducto');
    STORE.namespace('STORE.Carrito.formVerCarrito');

    STORE.Carrito.formVerProducto = function(posicionModeloEnStorage){

        $("productoDetalle").innerHTML = STORE.ProductTemplate.verProducto;

        var myModel = JSON.parse(localStorage.getItem("model:" + posicionModeloEnStorage));

        $("nombreModelo").innerHTML = myModel.nombreModelo;
        $("stockActualModelo").innerHTML = myModel.stockActualModelo;
        $("descripcionModelo").innerHTML = myModel.descripcionModelo;
        $("actualPrecioModelo").innerHTML =myModel.actualPrecioModelo;


    }

    STORE.Carrito.carruselProducto = function() {

        $("cuerpo").innerHTML = STORE.ProductTemplate.carrusel;

        var iteraciones =modelXPage;
        if(sessionStorage.getItem("pag")==sessionStorage.getItem("totalPagina")){
            var iteraciones = sessionStorage.getItem("restoPagina");
        }

        var angulo = 360 / iteraciones;

        //for
        for (let i = 0; i < iteraciones ; i++) {

            var nodoElementoCarrusel = document.createElement("div")
            nodoElementoCarrusel.className = "opcionCarrusel contenedorColumnaCarrusel";
            console.log(nodoElementoCarrusel);

            nodoElementoCarrusel.style.transform = "rotateY(-" + angulo*i +"deg) translateX(150px) rotatey(190deg)";
            console.log("el angulo asignado es: "+angulo*i);

            var nodoImagen = document.createElement("img");

            nodoImagen.className = "ImagenCarrusel";

            var modelo = JSON.parse(localStorage.getItem("model"+(modelXPage*sessionStorage.getItem("pag") + i)));

            var ruta="img/imageModel/"+modelo.rutaImagen;
            nodoImagen.src = ruta;

            nodoElementoCarrusel.appendChild(nodoImagen);

            var nodoTextoCarrusel = document.createElement("div")
            nodoTextoCarrusel.className = "textoCarrusel";

            nodoTextoCarrusel.innerText = modelo.nombreModelo;

            nodoElementoCarrusel.appendChild(nodoTextoCarrusel);

            var textoHiddenParaSaberPosicion = document.createElement("p")
            textoHiddenParaSaberPosicion.id = "model"+ (modelXPage*sessionStorage.getItem("pag") + i);

            nodoElementoCarrusel.appendChild(textoHiddenParaSaberPosicion);

            nodoElementoCarrusel.addEventListener("click",function(){
                STORE.Carrito.formVerProducto(textoHiddenParaSaberPosicion.innerHTML);
            });

            $('giran').appendChild(nodoElementoCarrusel);

        }
 //for
        STORE.DOMObjectLook("carruselmas");
        STORE.DOMObjectLook("carruselmenos");

        $("carruselmas").addEventListener("click",function(event){
            var pagin = sessionStorage.getItem("pag");
            var totalpagin = sessionStorage.getItem("totalPagina");
            if (pagin < totalpagin) {
                pagin++;
                sessionStorage.setItem("pag",pagin);
                STORE.Carrito.carruselProducto();
            }

        });
        $("carruselmenos").addEventListener("click",function(event){
            var pagin = sessionStorage.getItem("pag");
            if (pagin > 0) {
                pagin--;
                sessionStorage.setItem("pag",pagin);
                STORE.Carrito.carruselProducto();
            }

        });

        var ultimoModelo = modelXPage;


        if ((parseInt(sessionStorage.getItem("pag"))+1)  == parseInt(sessionStorage.getItem("totalPagina"))){

            ultimoModelo = sessionStorage.getItem("restoPagina");
        }
        alert("ultimoModelo" + ultimoModelo);

        for (var i=6;i>ultimoModelo;i--){
            $(carrusel[i-1]).style.display = "none";
        }
    };

    STORE.Carrito.formVerCarrito = function(){
        alert("fix me");
    };

    $("op_verProducto").addEventListener("click",STORE.Carrito.carruselProducto);
    $("op_verCarrito").addEventListener("click",STORE.Carrito.formVerCarrito);
}());