new STORE.DOMObjectLook("op_addClient");
new STORE.DOMObjectLook("op_initSession");

var ajax = STORE.Ajax;
var llamada;

$("op_addClient").addEventListener("click", function () {
    $("cuerpo").innerHTML = STORE.clientTemplate.insertTemplate;
    STORE.clientStrategyOne();
    ponerListenerEnSubmit("/register", funcionControladoraInsert);
});

$("op_initSession").addEventListener("click", function () {
    $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
    STORE.clientStrategyOne();
    ponerListenerEnSubmit("/validateSession", funcionControladoraLogin);
});

function ponerListenerEnSubmit(rutaControlador, funcionControladora) {
    $("submit").addEventListener("click", function () {
        var json = {};
        for (i = 0; i < STORE.list_input.length; i++) {
            json[STORE.list_input[i].id] = STORE.list_input[i].value;
        }
        llamada = new ajax.CargadorContenidos(rutaControlador, funcionControladora, JSON.stringify(json));
    })
}

function funcionControladoraLogin() {

    //preguntar por que se pasa JSON.dateParser
    var estado = JSON.parse(llamada.req.responseText, JSON.dateParser);

    if (estado.nif != undefined) {
        sessionStorage.setItem('idCliente', estado.nif);
        location.reload();
    }

    else if (estado.intento < estado.maxIntento) {
        tratarErrores(estado);
        STORE.Error.set_message("Te quedan " + (estado.maxIntento - estado.intento) + " intento(s)")
    }

    else {
        $("menuPrincipal").style.display = "none";
        $("cuerpo").innerHTML = STORE.clientTemplate.formSessionLocked;
        STORE.Error = STORE.managementError();
        $("locked").style.display = "none";
        var seconds = 0;
        var intervalId = null;
        var locked = function () {
            if (seconds >= estado.tiempoMaximoBloqueo) {
                STORE.Error.set_message("Pulsa Botón para desbloqueo");
                $("locked").style.display = "";
                clearInterval(intervalId);
                $("locked").addEventListener("click", function () {
                    llamada = new ajax.CargadorContenidos("/offLocked", function () {
                        location.reload();
                    });

                });
            }
            else {
                seconds = seconds + 1;
                STORE.Error.set_message("Estas Bloqueado. Te quedan " + (estado.tiempoMaximoBloqueo - seconds) + " seconds");
            }
        };
        intervalId = setInterval(locked, 1000);
    }
    STORE.Error.on();

};

function tratarErrores(estado) {
    estado.forEach(function (error) {
        //$(error.control).style.backgroundColor = STORE.Error.get_colorError();
        $(error.control).setAttribute('style', 'backgroundColor:' + STORE.Error.get_colorError() + ' !important');
        $("alertaError").innerText = error.mensajeError;
        STORE.Error.on();
    });
}

function funcionControladoraInsert() {
    var estado = JSON.parse(llamada.req.responseText);

    if (estado.nif != "undefined") {
        location.reload();
    }
    else {
        tratarErrores(estado);
    }
}
