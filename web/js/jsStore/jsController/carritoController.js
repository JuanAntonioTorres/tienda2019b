(function(){


    new STORE.DOMObjectLook("op_verProducto");
    new STORE.DOMObjectLook("op_verCarrito");

    var carrusel = new Array("carro1", "carro2", "carro3","carro4","carro5","carro6");
    var carruselModel = new Array("primera", "segunda", "tercera","cuarta","quinta","sexta");
    var carruselImage = new Array("primeraI", "segundaI", "terceraI","cuartaI","quintaI","sextaI");
    var carruselId = new Array("primeraH", "segundaH", "terceraH","cuartaH","quintaH","sextaH");
    var degred = new Array(0, 180, 120, 90, 72, 60);

    var ajax = STORE.Ajax;
    var llamada;
    sessionStorage.setItem("pag",0);
    sessionStorage.setItem("modelXpag",6);

    llamada = new ajax.CargadorContenidos("/getProductos", function () {
        var i = 0;
        var estado = JSON.parse(llamada.req.responseText);
        estado.forEach(function (model) {
            localStorage.setItem("producto:" + i, "model:" + model.IdModelo);
            localStorage.setItem("model:" + model.IdModelo, JSON.stringify(model));
            i++;
        });
        sessionStorage.setItem("totalModel",i-1);
        var numero = sessionStorage.getItem("totalModel")/sessionStorage.getItem("modelXpag");
        sessionStorage.setItem("restoPagina",parseInt((numero - parseInt(numero)) * 10));
        if (numero > parseInt(numero)){
            numero++;
        }
        sessionStorage.setItem("totalPagina",parseInt(numero));

        alert("pag:" + sessionStorage.getItem("totalPagina") + "Resto:" + sessionStorage.getItem("restoPagina"));
    });


    STORE.namespace('STORE.Carrito.carruselProducto');
    STORE.namespace('STORE.Carrito.formVerProducto');
    STORE.namespace('STORE.Carrito.formVerCarrito');

    STORE.Carrito.formVerProducto = function(id){

        $("productoDetalle").innerHTML = STORE.ProductTemplate.verProducto;

        var myModel = JSON.parse(localStorage.getItem("model:" + id));

        $("nombreModelo").innerHTML = myModel.nombreModelo;
        $("stockActualModelo").innerHTML = myModel.stockActualModelo;
        $("descripcionModelo").innerHTML = myModel.descripcionModelo;
        $("actualPrecioModelo").innerHTML =myModel.actualPrecioModelo;


    }

    STORE.Carrito.carruselProducto = function() {


        $("cuerpo").innerHTML = STORE.ProductTemplate.carrusel;

        $("primeraI").addEventListener("click",function(event){

            STORE.Carrito.formVerProducto($("primeraH").innerHTML);
        });
        $("segundaI").addEventListener("click",function(){
            STORE.Carrito.formVerProducto($("segundaH").innerHTML);
        });
        $("terceraI").addEventListener("click",function(){
            STORE.Carrito.formVerProducto($("terceraH").innerHTML);
        });
        $("cuartaI").addEventListener("click",function(){
            STORE.Carrito.formVerProducto($("cuartaH").innerHTML);
        });
        $("quintaI").addEventListener("click",function(){
            STORE.Carrito.formVerProducto($("quintaH").innerHTML);
        });
        $("sextaI").addEventListener("click",function(){
            STORE.Carrito.formVerProducto($("sextaH").innerHTML);
        });

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