(function () {

    new STORE.DOMObjectLook("op_verProducto");
    new STORE.DOMObjectLook("op_verCarrito");
    var ajax = STORE.Ajax;
    var llamada;
    var velocidad = 20;
    var modelXPage = 2;
    var limiteModelosPorLlamada = 3;
    var paginasMostradas = 2;
    var arrayCarrito = [];
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

    var ponerListenerEnNumeroPaginas = function () {
        var inicio = parseInt(sessionStorage.getItem("pag")) - Math.floor(paginasMostradas / 2);
        var fin = parseInt(sessionStorage.getItem("pag")) + Math.ceil(paginasMostradas / 2);
        if (inicio < 0) {
            fin = fin - (inicio);
            inicio = 0;
        }

        if (sessionStorage.getItem("ultimaPagina") != undefined &&
            inicio + paginasMostradas > parseInt(sessionStorage.getItem("ultimaPagina"))) {
            //   1 +        3         4>2
            fin = parseInt(sessionStorage.getItem("ultimaPagina")) + 1;
            //  3           2+1
            inicio = inicio - ((inicio + paginasMostradas) - parseInt(sessionStorage.getItem("ultimaPagina")) - 1);
            if (inicio < 0) inicio = 0;
            if (fin > sessionStorage.getItem("")) parseInt(sessionStorage.getItem("ultimaPagina")) + 1;
            //  4    -  ((4+3)- 2) -1 = 4
        }

        $("contenedorPaginaNumeros").innerHTML = "";

        for (var i = inicio; i < fin; i++) {
            if (sessionStorage.getItem("ultimaPagina") == undefined ||
                i <= parseInt(sessionStorage.getItem("ultimaPagina"))) {
                window['divConNumeroDePagina ' + i] = document.createElement("div");
                window['divConNumeroDePagina ' + i].innerText = i;
                window['divConNumeroDePagina ' + i].id = "divConNumeroDePagina" + i;
                window['divConNumeroDePagina ' + i].className = "boton s2";
                window['divConNumeroDePagina ' + i].addEventListener("click", function (e) {
                    if (e.srcElement)
                        tag = e.srcElement;
                    else if (e.target)
                        tag = e.target;

                    sessionStorage.setItem("pag", tag.innerText);
                    mostrarCarrusel();
                });
                $("contenedorPaginaNumeros").appendChild(window['divConNumeroDePagina ' + i]);
            }

            ponerDiferentePagActual();
            desactivarBotonesNoNecesarios();
        }
    }

    var cargarProductos = function (funcionDespuesDeCargar, inicioIn) {
        var inicio;
        if (inicioIn != null) {
            var inicio = inicioIn + (parseInt(sessionStorage.getItem("pag") * modelXPage));
        }
        else {
            inicio = parseInt(sessionStorage.getItem("pag") * modelXPage);
        }

        if (localStorage.getItem("productosCargados") == undefined ||
            parseInt(sessionStorage.getItem("modelosCargados")) <= inicio + modelXPage) {
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

                if (estado.length < limiteModelosPorLlamada) {
                    sessionStorage.setItem("ultimaPagina", Math.ceil(i / modelXPage) - 1);
                    sessionStorage.setItem("restoPagina", i % modelXPage);
                }

                sessionStorage.setItem("modelosCargados", i);

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
        if (sessionStorage.getItem("pag") == sessionStorage.getItem("ultimaPagina") &&
            sessionStorage.getItem("restoPagina") != 0) {
            iteraciones = parseInt(sessionStorage.getItem("restoPagina"));
        }
        var angulo = (360 / iteraciones)
        //for
        var i = 0;
        (function(i){
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

                if (localStorage.getItem("model" + (modelXPage * sessionStorage.getItem("pag") + i)) == undefined &&
                    localStorage.getItem("ultimaPagina") == undefined) {
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

    var mostrarCarrusel = function () {
        cargarProductos(pintarCarrusel, null);
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
        var totalpagin;
        if (sessionStorage.getItem("ultimaPagina") != undefined) {
            totalpagin = parseInt(sessionStorage.getItem("ultimaPagina"));
            if (pagin < totalpagin) {
                pagin++;
                sessionStorage.setItem("pag", pagin);
                mostrarCarrusel();
            }
        }
        else {
            pagin++;
            sessionStorage.setItem("pag", pagin);
            mostrarCarrusel();
        }
    }
    var verDetallesProductos = function (posicion) {
        $("productoDetalle").innerHTML = STORE.ProductTemplate.verProducto;
        var myModel = JSON.parse(localStorage.getItem("model" + posicion));
        $("nombreModelo").innerHTML = myModel.nombreModelo;
        $("stockActualModelo").innerHTML = myModel.stockActualModelo;
        $("descripcionModelo").innerHTML = myModel.descripcionModelo;
        $("actualPrecioModelo").innerHTML = myModel.actualPrecioModelo;
        $("addCarrito").addEventListener("click",function () {
            insertarEnArray(myModel);
        })
    }

    var insertarEnArray = function(model) {
        model.posicionArray = arrayCarrito.length;
        model.cantidadPedida = 1;
        var encontrado = false;
        arrayCarrito.forEach(modelo => {
            if (model.IdModelo === modelo.IdModelo) {
                modelo.cantidadPedida++;
                encontrado = true;
            }
        })
        if (!encontrado) {
            arrayCarrito.push(model);
        }
    }
    arrayCarrito = (function() {
        llamada = new ajax.CargadorContenidos("/getCarrito", function () {
            var estado = JSON.parse(llamada.req.responseText);
            if (estado.length === 0) {
                alert("Nada en el carro");
            } else {
                console.log(estado.length + " articulos")
            }
            estado.forEach(carrito => {
                insertarEnArray(carrito);
            })
            sessionStorage.setItem("carritoCargado", "true");
        });
        return estado;
    })();
    var quitarUnidadCarrito = function (datosLineaVenta) {
        arrayCarrito.
        alert("quitarUnidadCarrito");
        console.log(datosLineaVenta)
    }
    var addUnidadCarrito = function (datosLineaVenta) {
        alert("addUnidadCarrito");
        console.log(datosLineaVenta)
    }
    var borrarElementoCarrito = function (datosLineaVenta) {
        alert("borrarElementoCarrito");
        console.log(datosLineaVenta)
    }
    var mostrarCarrito = function () {
        $("cuerpo").innerHTML = STORE.ProductTemplate.carrito;
        var total = 0;

        arrayCarrito.forEach(function (item) {
            var lineaCarrito = document.createElement("div");
            lineaCarrito.className = "etiqueta s11 contenedorFila";
            var lineaCarritoInfo = document.createElement("div");
            lineaCarritoInfo.className = "etiqueta s11 contenedorFila";
            var lineaCarritoOpciones = document.createElement("div");
            lineaCarritoOpciones.className = "etiqueta s11 contenedorFila";

            var infoIdModelo = document.createElement("div");
            infoIdModelo.className = "etiqueta s11"; //poner clase estilo
            var infoCantidad = document.createElement("div");
            infoCantidad.className = "etiqueta s11";
            var infoPrecioUnidad = document.createElement("div");
            infoPrecioUnidad.className = "etiqueta s11";
            var infoSubTotal = document.createElement("div");
            infoSubTotal.className = "etiqueta s11";
            var eliminar = document.createElement("div");
            eliminar.className = "etiqueta s11";
            eliminar.id="eliminar";
            var quitarUnidad = document.createElement("div");
            quitarUnidad.className = "etiqueta s11";
            quitarUnidad.id="quitarUnidad";
            var aniadirUnidad = document.createElement("div");
            aniadirUnidad.className = "etiqueta s11";
            aniadirUnidad.id="aniadirUnidad";

            lineaCarritoInfo.appendChild(infoIdModelo);
            lineaCarritoInfo.appendChild(infoCantidad);
            lineaCarritoInfo.appendChild(infoPrecioUnidad);
            lineaCarritoInfo.appendChild(infoSubTotal);
            lineaCarritoOpciones.appendChild(eliminar);
            lineaCarritoOpciones.appendChild(quitarUnidad);
            lineaCarritoOpciones.appendChild(aniadirUnidad);

            aniadirUnidad.addEventListener("click",function(){
                quitarUnidadCarrito(item)
            });
            quitarUnidad.addEventListener("click",function(){
                addUnidadCarrito(item)
            });
            eliminar.addEventListener("click",function(){
                borrarElementoCarrito(item)
            });

            eliminar.innerText="Eliminar";
            aniadirUnidad.innerText="+";
            quitarUnidad.innerText="-";
            infoIdModelo.innerText = item.IdModelo;
            infoCantidad.innerText =  item.cantidadPedida;
            infoPrecioUnidad.innerText = item.actualPrecioModelo;
            let subtotal = item.cantidadPedida * item.actualPrecioModelo;
            infoSubTotal.innerText = subtotal.toString();
            total += subtotal;
            lineaCarrito.appendChild(lineaCarritoInfo)
            lineaCarrito.appendChild(lineaCarritoOpciones)
            $("lineasCarrito").appendChild(lineaCarrito)

        });
        $("totalCarrito").innerText=total;
        $("guardarCarrito").addEventListener("click",guardarCarrito);
        $("comprarCarrito").addEventListener("click",comprarCarrito);
    }
    var guardarCarrito = function () {
        alert("programame papi")
    }
    var comprarCarrito = function () {
        alert("programame papi")
    }
    $("op_verProducto").addEventListener("click", mostrarCarrusel);
    $("op_verCarrito").addEventListener("click", mostrarCarrito);

}());