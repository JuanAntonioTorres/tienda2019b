(function () {

    new STORE.DOMObjectLook("op_verProducto");
    new STORE.DOMObjectLook("op_verCarrito");
    var ajax = STORE.Ajax;
    var llamada;
    var modelXPage = 6;
    sessionStorage.setItem("pag", 0);

    llamada = new ajax.CargadorContenidos("/getProducts", function () {
        var i = 0;
        var estado = JSON.parse(llamada.req.responseText);

        estado.forEach(function (model) {
            if (localStorage.getItem("produtosCargados") != "true") {
                localStorage.setItem("model" + i, JSON.stringify(model));
            }
            i++;
        });

        sessionStorage.setItem("restoPagina", i % modelXPage);

        sessionStorage.setItem("ultimaPagina", Math.floor(estado.length / modelXPage));

        localStorage.setItem("produtosCargados", "true");
    });


    var funcionControladoraPaginaMenos = function () {
        var pagin = sessionStorage.getItem("pag");
        if (pagin > 0) {
            pagin--;
            sessionStorage.setItem("pag", pagin);
            mostrarCarrusel();
        }
    }


    var funcionControladoraPaginaMas = function () {
        var pagin = sessionStorage.getItem("pag");
        var totalpagin = sessionStorage.getItem("ultimaPagina");
        if (pagin < totalpagin) {
            pagin++;
            sessionStorage.setItem("pag", pagin);
            mostrarCarrusel();
        }
    }


    var mostrarCarrusel = function () {
        $("cuerpo").innerHTML = STORE.ProductTemplate.carrusel;
        new STORE.DOMObjectLook("carruselmas");
        new STORE.DOMObjectLook("carruselmenos");
        $("carruselmenos").addEventListener("click", funcionControladoraPaginaMenos);
        $("carruselmas").addEventListener("click", funcionControladoraPaginaMas);
        var iteraciones = modelXPage;
        if (sessionStorage.getItem("pag") == sessionStorage.getItem("ultimaPagina")) {
            iteraciones = sessionStorage.getItem("restoPagina");
        }
        var angulo = (360 / iteraciones)
        //for
        for (let i = 0; i < iteraciones; i++) {

            var nodoPanelMobil = document.createElement("div");
            nodoPanelMobil.className = "nodoPanelMobil";

            var nodoElementoCarruselDelantero = document.createElement("div");
            var nodoElementoCarruselTrasero = document.createElement("div");
            var nodoElementoCarruselLateralDerecho = document.createElement("div");
            var nodoElementoCarruselLateralIzquierdo = document.createElement("div");

            nodoElementoCarruselDelantero.className = "nodoElementoCarruselDelantero";
            nodoElementoCarruselTrasero.className = "nodoElementoCarruselTrasero";
            nodoElementoCarruselLateralDerecho.className = "nodoElementoCarruselLateralDerecho";
            nodoElementoCarruselLateralIzquierdo.className = "nodoElementoCarruselLateralIzquierdo";

            nodoPanelMobil.appendChild(nodoElementoCarruselDelantero);
            nodoPanelMobil.appendChild(nodoElementoCarruselTrasero);
            nodoPanelMobil.appendChild(nodoElementoCarruselLateralDerecho);
            nodoPanelMobil.appendChild(nodoElementoCarruselLateralIzquierdo);

            nodoPanelMobil.style.transform = "rotateY(-" + angulo * i + "deg) translateX(140px) rotatey(0deg)";

            var nodoImagenDelantera = document.createElement("img");
            var nodoImagenTrasera = document.createElement("img");
            var nodoImagenDerecha = document.createElement("img");
            var nodoImagenIzquierda = document.createElement("img");
            nodoImagenDelantera.className = "nodoImagenDelantera";
            nodoImagenTrasera.className = "nodoImagenTrasera";
            nodoImagenDerecha.className = "nodoImagenDerecha";
            nodoImagenIzquierda.className = "nodoImagenIzquierda";
            var modelo = JSON.parse(localStorage.getItem("model" + (modelXPage * sessionStorage.getItem("pag") + i)));
            var rutaImagenDelantera = "img/imageModel/" + modelo.imagenDelantera;
            var rutaImagenTrasera = "img/imageModel/" + modelo.imagenTrasera;
            var rutaImagenIzquierda =  "img/imageModel/" + modelo.imagenLado;
            var rutaImagenDerecha =  "img/imageModel/" + modelo.imagenLado;
            nodoImagenDelantera.src = rutaImagenDelantera;
            nodoImagenTrasera.src = rutaImagenTrasera;
            nodoImagenIzquierda.src = rutaImagenIzquierda;
            nodoImagenDerecha.src = rutaImagenDerecha;

            console.info(rutaImagenDelantera);
            console.info(nodoImagenTrasera);
            console.info(nodoImagenIzquierda);
            console.info(nodoImagenDerecha);

            nodoElementoCarruselDelantero.appendChild(nodoImagenDelantera);
            nodoElementoCarruselTrasero.appendChild(nodoImagenTrasera);
            nodoElementoCarruselLateralIzquierdo.appendChild(nodoImagenIzquierda);
            nodoElementoCarruselLateralDerecho.appendChild(nodoImagenDerecha);

            var nodoPanelBase = document.createElement("div");
            nodoPanelBase.className = "nodoPanelBase";

            var nodoBaseElementoCarruselArriba = document.createElement("div");
            nodoBaseElementoCarruselArriba.className = "nodoBaseElementoCarruselArriba s4";

            var nodoBaseElementoCarruselAbajo = document.createElement("div");
            nodoBaseElementoCarruselAbajo.className = "nodoBaseElementoCarruselAbajo s4";

            var nodoBaseElementoCarruselFrontal = document.createElement("div");
            nodoBaseElementoCarruselFrontal.className = "nodoBaseElementoCarruselFrontal s4";

            var nodoBaseElementoCarruselTrasero = document.createElement("div");
            nodoBaseElementoCarruselTrasero.className = "nodoBaseElementoCarruselTrasero s4";

            var nodoBaseElementoCarruselLateralIquierdo = document.createElement("div");
            nodoBaseElementoCarruselLateralIquierdo.className = "nodoBaseElementoCarruselLateralIquierdo s4";

            var nodoBaseElementoCarruselLateralDerecho = document.createElement("div");
            nodoBaseElementoCarruselLateralDerecho.className = "nodoBaseElementoCarruselLateralDerecho s4";

            nodoPanelBase.appendChild(nodoBaseElementoCarruselArriba);
            nodoPanelBase.appendChild(nodoBaseElementoCarruselAbajo);
            nodoPanelBase.appendChild(nodoBaseElementoCarruselFrontal);
            nodoPanelBase.appendChild(nodoBaseElementoCarruselTrasero);
            nodoPanelBase.appendChild(nodoBaseElementoCarruselLateralIquierdo);
            nodoPanelBase.appendChild(nodoBaseElementoCarruselLateralDerecho);

            nodoBaseElementoCarruselLateralDerecho.innerText = modelo.nombreModelo;
            nodoBaseElementoCarruselLateralIquierdo.innerText = modelo.nombreModelo;
            nodoBaseElementoCarruselFrontal.innerText = modelo.nombreModelo;
            nodoBaseElementoCarruselTrasero.innerText = modelo.nombreModelo;

            nodoPanelMobil.appendChild(nodoPanelBase);


            var textoHiddenParaSaberPosicion = document.createElement("p")
            textoHiddenParaSaberPosicion.id = "model" + ((modelXPage * sessionStorage.getItem("pag")) + i);

            nodoPanelMobil.appendChild(textoHiddenParaSaberPosicion);

            nodoPanelMobil.addEventListener("click", function () {
                verDetallesProductos(textoHiddenParaSaberPosicion.innerHTML);
            });

            $('giran').appendChild(nodoPanelMobil);

        }
    }

    var verDetallesProductos = function (posicion) {
        $("productoDetalle").innerHTML = STORE.ProductTemplate.verProducto;
        var myModel = JSON.parse(localStorage.getItem("model:" + posicion));

        $("nombreModelo").innerHTML = myModel.nombreModelo;
        $("stockActualModelo").innerHTML = myModel.stockActualModelo;
        $("descripcionModelo").innerHTML = myModel.descripcionModelo;
        $("actualPrecioModelo").innerHTML = myModel.actualPrecioModelo;
    }

    $("op_verProducto").addEventListener("click", mostrarCarrusel);

}());