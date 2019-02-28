(function(){


    new STORE.DOMObjectLook("op_verProducto");
    new STORE.DOMObjectLook("op_verCarrito");

    var ajax = STORE.Ajax;
    var llamada;
    var modelXPage = 6;
    sessionStorage.setItem("pag",0);

    llamada = new ajax.CargadorContenidos("/getProducts", function () {
        var i = 0;
        var estado = JSON.parse(llamada.req.responseText);

        estado.forEach(function (model) {
            localStorage.setItem("model"+i, JSON.stringify(model));
            i++;
        });

        sessionStorage.setItem("restoPagina",i % modelXPage);

        sessionStorage.setItem("totalPagina",i);

        alert("pag:" + sessionStorage.getItem("totalPagina") + "Resto:" + sessionStorage.getItem("restoPagina"));
    });

    var iteraciones =modelXPage;
    if(sessionStorage.getItem("pag")==sessionStorage.getItem("totalPagina")){
        iteraciones = sessionStorage.getItem("restoPagina");
    }

    var angulo = 360 / iteraciones;

    for (let i = 0; i < iteraciones ; i++) {

        var nodoElementoCarrusel = document.createElement("div").className = "opcionCarrusel contenedorColumnaCarrusel";

        nodoElementoCarrusel.style.transform = "rotateY(-" + angulo*i +"deg) translateX($translateCarrusel) rotatey(190deg)";
        console.log("el angulo asignado es: "+angulo*i);

        var nodoImagen = document.createElement("img").className = "ImagenCarrusel";

        var modelo = JSON.parse(localStorage.getItem("model"+(modelXPage*sessionStorage.getItem("pag") + i)));

        nodoImagen.src = model.rutaImagen;

        document.getElementsByClassName("opcionCarrusel")[i].appendChild(nodoImagen);

        var nodoTextoCarrusel = (document.createElement("div").className = "textoCarrusel");

        nodoTextoCarrusel.innerText = modelo.nombreModelo;

        document.getElementsByClassName("opcionCarrusel")[i].appendChild(nodoTextoCarrusel);

        var textoHiddenParaSaberPosicion = document.createElement("p").id = "model"+ (modelXPage*sessionStorage.getItem("pag") + i);

        nodoTextoCarrusel.appendChild(textoHiddenParaSaberPosicion);

        nodoElementoCarrusel.addEventListener("click",function(){
            STORE.Carrito.formVerProducto(textoHiddenParaSaberPosicion.innerHTML);
        });

        $('giran').appendChild(nodoElementoCarrusel);

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

        new STORE.DOMObjectLook("carruselmas");
        new STORE.DOMObjectLook("carruselmenos");
        $("carruselmas").addEventListener("click",function(event){
            var pagin = sessionStorage.getItem("pag");
            pagin++;
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

        var ultimoModelo = sessionStorage.getItem("modelXpag");


        if ((parseInt(sessionStorage.getItem("pag"))+1)  == parseInt(sessionStorage.getItem("totalPagina"))){

            ultimoModelo = sessionStorage.getItem("restoPagina");
        }
        alert("ultimoModelo" + ultimoModelo);

        var incrementDegred = 0;

        for (var i= sessionStorage.getItem("pag") * sessionStorage.getItem("modelXpag"),j=0;j<ultimoModelo;i++,j++){

            var model = JSON.parse(localStorage.getItem(localStorage.getItem("producto:" + i)));

            $(carruselModel[j]).innerHTML = model.nombreModelo;
            $(carruselImage[j]).src = "img/imageModel/" + model.imagen;
            $(carruselId[j]).innerHTML =  model.IdModelo;
            if(j == 0){
                $(carrusel[j]).style.transform = "rotateY(-" + 0 +"deg) translateX($translateCarrusel) rotatey(190deg)";
            }
            else{
                incrementDegred += degred[ultimoModelo-1];
                alert("incrementDegred" + incrementDegred);
                $(carrusel[j]).style.transform = "rotateY(-" + incrementDegred +"deg) translateX($translateCarrusel) rotatey(190deg)";

            }

        }
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