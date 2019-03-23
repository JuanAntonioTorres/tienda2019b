(function () {

        new STORE.DOMObjectLook("op_verProducto");
        var ajax = STORE.Ajax;
        var llamada;
        var velocidad = 20;
        var modelXPage = 1;
        var paginasMostradas = 1;
        sessionStorage.setItem("pag", 0);

        var desactivarBotonesNoNecesarios = function () {
            if (sessionStorage.getItem("pag") == "0") {
                $("carruselmenos").style.visibility = "hidden";
            }
            else {
                $("carruselmenos").style.visibility = "visible";
            }

            if (sessionStorage.getItem("pag") == sessionStorage.getItem("ultimaPagina")) {
                $("carruselmas").style.visibility = "hidden";
            }
            else {
                $("carruselmas").style.visibility = "visible";
            }

        }

        var ponerDiferentePagActual = function () {
            for (let i = 0; i < $("contenedorPaginaNumeros").childElementCount; i++) {
                if ($("contenedorPaginaNumeros").childNodes[i].textContent == sessionStorage.getItem("pag")) {
                    $("contenedorPaginaNumeros").childNodes[i].className = "etiqueta s8";
                }
            }
        }

        var obtenerInicioYFin = function () {
            return new Promise((resolve) => {
                var inicio = parseInt(sessionStorage.getItem("pag")) - Math.floor(paginasMostradas / 2);
                var fin = parseInt(sessionStorage.getItem("pag")) + Math.floor(paginasMostradas / 2);
                if (inicio < 0) {
                    fin = fin - (inicio);
                    inicio = 0;
                }

                if (sessionStorage.getItem("ultimaPagina") !== null &&
                    inicio + (Math.floor(paginasMostradas) / 2) > parseInt(sessionStorage.getItem("ultimaPagina"))) {
                    fin = parseInt(sessionStorage.getItem("ultimaPagina"));
                    inicio = inicio - (inicio + (Math.floor(paginasMostradas / 2))-fin);
                    if (inicio < 0) inicio = 0;
                }
                resolve({inicio: inicio, fin: fin});
            })
        }

        var crearDivsBotones = function (inicioFin) {
            return new Promise((resolve) => {
                for (; inicioFin.inicio <= inicioFin.fin; inicioFin.inicio++) {
                    var element = document.createElement("div");
                    (function (element,inicioFin) {
                        element.innerText = inicioFin.inicio;
                        element.id = "divConNumeroDePagina" + inicioFin.inicio;
                        element.className = "boton s2";
                        element.addEventListener("click", function () {
                            sessionStorage.setItem("pag", element.innerText);
                            cargarProductos(pintarCarrusel, element.innerText * modelXPage);
                        })
                        $("contenedorPaginaNumeros").appendChild(element);
                    })(element,inicioFin)
                }

                resolve();
            })
        }

        var crearBotones = function (inicioFin) {
            return new Promise((resolve) => {
                $("contenedorPaginaNumeros").innerHTML = "";
                (function (inicioFin) {
                    crearDivsBotones(inicioFin).then(() => {
                        ponerDiferentePagActual();
                        desactivarBotonesNoNecesarios();
                        resolve();
                    })
                })(inicioFin);
            })
        }

        var ponerListenerEnNumeroPaginas = function () {
            return new Promise((resolve) => {
                obtenerInicioYFin().then((inicioFin) => {
                    crearBotones(inicioFin).then(() => {
                        resolve();
                    })
                })
            })
        }

        var cargarProductos = function (funcionDespuesDeCargar, inicio) {
            if (localStorage.getItem("productosCargados") === null ||
                parseInt(sessionStorage.getItem("modelosCargados")) < inicio + modelXPage) {
                json = {
                    inicioCache: inicio,
                    cantidadCache: Math.ceil((modelXPage * paginasMostradas)/2) + 1
                };

                llamada = new ajax.CargadorContenidos("/getProducts", function () {
                    var estado = JSON.parse(llamada.req.responseText);
                    var i = json.inicioCache;

                    if (estado.length < parseInt(json.cantidadCache)) {
                        let ultimaPagina = Math.floor((i+estado.length) / modelXPage);
                        let resto = Math.floor((i+estado.length) %  modelXPage);
                        if (resto > 0) {
                            ultimaPagina++;
                        }
                        sessionStorage.setItem("ultimaPagina", ultimaPagina);
                        sessionStorage.setItem("restoPagina", i % modelXPage);
                    }

                    else{
                        estado.pop();
                    }

                    estado.forEach(function (model) {
                        localStorage.setItem("model" + i, JSON.stringify(model));
                        i++;
                    });

                    sessionStorage.setItem("modelosCargados", i);

                    localStorage.setItem("productosCargados", "true");

                    funcionDespuesDeCargar();
                }, JSON.stringify(json));
            }
            else {
                funcionDespuesDeCargar();
            }

        }

        var pintarCarrusel = function () {

            var iteraciones = modelXPage;
            if (sessionStorage.getItem("pag") === sessionStorage.getItem("ultimaPagina") &&
                sessionStorage.getItem("restoPagina") != 0) {
                iteraciones = parseInt(sessionStorage.getItem("restoPagina"));
            }
            var angulo = (360 / iteraciones)
            //for
            var i = 0;
            (function (i) {
                for (; i < iteraciones; i++) {

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

                    if (localStorage.getItem("model" + (modelXPage * sessionStorage.getItem("pag") + i)) === null &&
                        localStorage.getItem("ultimaPagina") === null) {
                        cargarProductos(pintarCarrusel, modelXPage * sessionStorage.getItem("pag") + i);
                        break;
                    }
                    else {
                        var modelo = JSON.parse(localStorage.getItem("model" + (modelXPage * sessionStorage.getItem("pag") + i)));
                    }

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
                        verDetallesProductos(i);
                    });

                    $('giran').appendChild(nodoPanelMobil);

                }
            }(i))

            ponerListenerEnNumeroPaginas();

        }

        var iniciarCarrusel = function () {
            $("cuerpo").innerHTML = STORE.ProductTemplate.carrusel;
            new STORE.DOMObjectLook("carruselmas");
            new STORE.DOMObjectLook("carruselmenos");
            new STORE.DOMObjectLook("carruselmasRapido");
            new STORE.DOMObjectLook("carruselmenosRapido");
            $("carruselmenos").addEventListener("click", funcionControladoraPaginaMenos);
            $("carruselmas").addEventListener("click", funcionControladoraPaginaMas);
            $("carruselmenosRapido").addEventListener("click", funcionControladoraPaginaMenosRapido);
            $("carruselmasRapido").addEventListener("click", funcionControladoraPaginaMasRapido);
            cargarProductos(pintarCarrusel, 0);
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
            var pagina = parseInt(sessionStorage.getItem("pag"));
            if (pagina > 0) {
                pagina--;
                sessionStorage.setItem("pag", pagina);
                cargarProductos(pintarCarrusel, pagina * modelXPage);
            }
        }

        var funcionControladoraPaginaMas = function () {

            var pagina = parseInt(sessionStorage.getItem("pag"));

            if (sessionStorage.getItem("ultimaPagina") === null ||
                pagina < parseInt(sessionStorage.getItem("ultimaPagina"))) {
                pagina++;
                sessionStorage.setItem("pag", pagina);
                cargarProductos(pintarCarrusel, pagina * modelXPage);
            }

        }

        var verDetallesProductos = function (posicion) {
            $("productoDetalle").innerHTML = STORE.ProductTemplate.verProducto;
            var myModel = JSON.parse(localStorage.getItem("model" + posicion));
            $("nombreModelo").innerHTML = myModel.nombreModelo;
            $("stockActualModelo").innerHTML = myModel.stockActualModelo;
            $("descripcionModelo").innerHTML = myModel.descripcionModelo;
            $("actualPrecioModelo").innerHTML = myModel.actualPrecioModelo;
            $("addCarrito").addEventListener("click", function () {
                STORE.CARRITO.insertarEnArray(myModel);
            })
        }

        $("op_verProducto").addEventListener("click", iniciarCarrusel);

    }
    ()
)
;