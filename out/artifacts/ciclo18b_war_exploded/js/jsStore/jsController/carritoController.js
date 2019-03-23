(function () {

    new STORE.DOMObjectLook("op_verCarrito");
    var ajax = STORE.Ajax;
    var llamada;
    var arrayCarrito = [];
    var arrayBorrados = [];

    var addToArray = function addToArray (model) {
        const promise = new Promise(function (resolve) {
            var encontrado = false;
            arrayCarrito.forEach(modelo => {
                if (model.idModelo === modelo.idModelo) {
                    modelo.cantidadPedida++;
                    encontrado = true;
                }
            })
            resolve(encontrado);
        })
        return promise
    }

    STORE.namespace("STORE.CARRITO.insertarEnArray");
    STORE.CARRITO.insertarEnArray = function (model) {
        model.posicionArray = arrayCarrito.length;
        addToArray(model).then((encontrado)=>{
            if (!encontrado) {
                model={
                    idModelo:model.idModelo,
                    nombreModelo:model.nombreModelo,
                    precioCompra:model.precioCompra,
                    cantidadPedida:model.cantidadPedida || 1,
                    posicionArray:model.posicionArray,
                    IdCliente:parseInt(sessionStorage.getItem("idClient"))
                }
                arrayCarrito.push(model);
            }
        })
    }

    arrayCarrito = (function () {
        var estado = [];
        llamada = new ajax.CargadorContenidos("/getCarrito", function () {
            estado = JSON.parse(llamada.req.responseText);
            if (estado.length === 0) {
                alert("Nada en el carro");
            } else {
                console.log(estado.length + " articulos")
            }
            estado.forEach(carrito => {
                carrito.posicionArray = arrayCarrito.length;
                STORE.CARRITO.insertarEnArray(carrito);
            })
            sessionStorage.setItem("carritoCargado", "true");
        });
        return estado;
    })();

    var quitarUnidadLineaCarrito = function (datosLineaVenta) {

        if(datosLineaVenta.cantidadPedida>1){
            datosLineaVenta.cantidadPedida--;
        }else{
            borrarLineaCarrito(datosLineaVenta.posicionArray);
        }
        mostrarCarrito();
    }

    var addUnidadLineaCarrito = function (datosLineaVenta) {
        datosLineaVenta.cantidadPedida++;
        mostrarCarrito();
    }

    var borrarLineaCarrito = function (posicion) {
        let itemBorrado = arrayCarrito.splice(posicion,1)
        arrayBorrado.push();
        mostrarCarrito();
    }

    function crearElementoHTML(tipo, clase) {
        let elemento = document.createElement(tipo);
        elemento.className = clase;
        return elemento;
    }

    var mostrarCarrito = function () {
        $("cuerpo").innerHTML = STORE.ProductTemplate.carrito;
        let total = 0;
        let vacio = true;
        arrayCarrito.forEach(function (item) {
            let subtotal = item.cantidadPedida * item.precioCompra;
            const elementosLineaCarroText = [item.nombreModelo, item.cantidadPedida, item.precioCompra, subtotal.toString(), "+", "-", "eliminar"];
            const lineaCarrito = crearElementoHTML("div", "etiqueta s11");
            for (let i = 0; i < elementosLineaCarroText.length; i++) {
                let elemento = crearElementoHTML("span", "etiqueta s11");
                lineaCarrito.appendChild(elemento);
                elemento.innerText = elementosLineaCarroText[i]
                if (i == 4) {
                    elemento.addEventListener("click", function () {
                        addUnidadLineaCarrito(item)
                    });
                } else if (i == 5) {
                    elemento.addEventListener("click", function () {
                        quitarUnidadLineaCarrito(item)
                    });
                } else if (i == 6) {
                    elemento.addEventListener("click", function () {
                        borrarLineaCarrito(item.posicionArray)
                    });
                }
            }
            total += subtotal;
            $("lineasCarrito").appendChild(lineaCarrito)
            vacio = false;
        });
        if (vacio) {
            let lineaVacia = crearElementoHTML("div","etiqueta s4 contenedorFila");
            lineaVacia.innerText = "No hay productos en el carro";
            $("lineasCarrito").appendChild(lineaVacia)
        }else{
            $("totalCarrito").innerText ="Total: "+total;
            $("guardarCarrito").addEventListener("click", guardarCarrito);
            $("comprarCarrito").addEventListener("click", comprarCarrito);
        }
    }

    var guardarCarrito = function () {
        let json = JSON.stringify(arrayCarrito);
        llamada = new ajax.CargadorContenidos("/guardarCarrito", function () {
            JSON.parse(llamada.req.responseText);
            console.log("Carro guardado")
            sessionStorage.setItem("timeCarrito", Date.now().toPrecision());
        },json);
    }

    var comprarCarrito = function () {
        alert("programame papi")
    }

    $("op_verCarrito").addEventListener("click", mostrarCarrito);

}());