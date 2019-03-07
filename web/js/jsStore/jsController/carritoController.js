(function () {

    new STORE.DOMObjectLook("op_verProducto");
    new STORE.DOMObjectLook("op_verCarrito");
    var ajax = STORE.Ajax;
    var llamada;
    var modelXPage = 2;
    var velocidad = 20;
    var limiteModelosPorLlamada = 6;
    var paginasMostradas = 3;

    sessionStorage.setItem("pag", 0);

    var ponerListenerEnNumeroPaginas = function () {
        var inicio =  parseInt(sessionStorage.getItem("pag")) - Math.floor(paginasMostradas / 2);
        var fin =  parseInt(sessionStorage.getItem("pag")) + Math.ceil(paginasMostradas / 2);
        if (inicio < 0) inicio = 0;
        $("contenedorPaginaNumeros").innerHTML = "";
        for (var i = inicio; i < fin; i++) {
            if(i<=parseInt(sessionStorage.getItem("ultimaPagina"))){
                window['divConNumeroDePagina '+ i]= document.createElement("div");
                window['divConNumeroDePagina '+ i].innerText = i;
                window['divConNumeroDePagina '+ i].id = "divConNumeroDePagina" + i;
                window['divConNumeroDePagina '+ i].className = "boton s2";
                window['divConNumeroDePagina '+ i].addEventListener("click", function (e) {
                    if (e.srcElement)
                        tag = e.srcElement;
                    else if (e.target)
                        tag = e.target;

                    alert("El elemento selecionado ha sido " + tag);
                    sessionStorage.setItem("pag",tag.innerText);
                    mostrarCarrusel();
                });
                $("contenedorPaginaNumeros").appendChild(window['divConNumeroDePagina '+ i]);
            }
        }
    }

    var cargarProductos = function (funcionDespuesDeCargar) {
        var inicio = sessionStorage.getItem("pag") * modelXPage;
        if (localStorage.getItem("productosCargados") == undefined||
            parseInt(sessionStorage.getItem("modelosCargados")) <= inicio) {
            var json = {
                inicioCache: inicio,
                cantidadCache: limiteModelosPorLlamada
            };
            json = JSON.stringify(json);
            llamada = new ajax.CargadorContenidos("/getProducts", function () {
                var i = inicio;
                var estado = JSON.parse(llamada.req.responseText);
                estado.forEach(function (model) {
                    localStorage.setItem("model" + i, JSON.stringify(model));
                    i++;
                });

                sessionStorage.setItem("modelosCargados", i );

                sessionStorage.setItem("restoPagina", i % modelXPage);

                sessionStorage.setItem("ultimaPagina", Math.floor(i / modelXPage));

                localStorage.setItem("productosCargados", "true");

                funcionDespuesDeCargar();
            }, json);
        }
        else funcionDespuesDeCargar();
    }

    var pintarCarrusel = function () {
        $("cuerpo").innerHTML = STORE.ProductTemplate.carrusel;
        new STORE.DOMObjectLook("carruselmas");
        new STORE.DOMObjectLook("carruselmenos");
        new STORE.DOMObjectLook("carruselmasRapido");
        new STORE.DOMObjectLook("carruselmenosRapido");
        $("carruselmenos").addEventListener("click", funcionControladoraPaginaMenos);
        $("carruselmas").addEventListener("click", funcionControladoraPaginaMas);
        $("carruselmenosRapido").addEventListener("click", funcionControladoraPaginaMenosRapido);
        $("carruselmasRapido").addEventListener("click", funcionControladoraPaginaMasRapido);
        var iteraciones = modelXPage;
        if (sessionStorage.getItem("pag") == sessionStorage.getItem("ultimaPagina") && sessionStorage.getItem("restoPagina") != 0) {
            iteraciones =  parseInt(sessionStorage.getItem("restoPagina"));
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
            var rutaImagenIzquierda = "img/imageModel/" + modelo.imagenLado;
            var rutaImagenDerecha = "img/imageModel/" + modelo.imagenLado;
            nodoImagenDelantera.src = rutaImagenDelantera;
            nodoImagenTrasera.src = rutaImagenTrasera;
            nodoImagenIzquierda.src = rutaImagenIzquierda;
            nodoImagenDerecha.src = rutaImagenDerecha;

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
            textoHiddenParaSaberPosicion.innerText = (modelXPage * sessionStorage.getItem("pag")) + i;

            nodoPanelMobil.appendChild(textoHiddenParaSaberPosicion);

            nodoPanelMobil.addEventListener("click", function () {
                verDetallesProductos(textoHiddenParaSaberPosicion.innerText);
            });

            $('giran').appendChild(nodoPanelMobil);

        }

        ponerListenerEnNumeroPaginas();

    }

    var mostrarCarrusel = function () {
        cargarProductos(pintarCarrusel);
    }

    var funcionControladoraPaginaMenosRapido = function () {
        if (velocidad > 0) {
            $("giran").style["-webkit-animation-duration"] = (--velocidad) + "s";
        }
    }
    var funcionControladoraPaginaMasRapido = function () {
        $("giran").style["-webkit-animation-duration"] = (++velocidad) + "s";
    }
    var funcionControladoraPaginaMenos = function () {
        var pagin = parseInt(sessionStorage.getItem("pag"));
        if (pagin > 0) {
            pagin--;
            sessionStorage.setItem("pag", pagin);
            mostrarCarrusel();
        }
    }
    var funcionControladoraPaginaMas = function () {
        var pagin = parseInt(sessionStorage.getItem("pag"));
        var totalpagin = parseInt(sessionStorage.getItem("ultimaPagina"));
        if (pagin < totalpagin) {
            pagin++;
            sessionStorage.setItem("pag", pagin);
            mostrarCarrusel();
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