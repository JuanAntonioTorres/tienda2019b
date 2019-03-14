(function(){

    var ajax = STORE.Ajax;
    var llamada;

    var instertClientListener = function() {
        $("cuerpo").innerHTML = STORE.clientTemplate.insertTemplate;
         activarEstrategias();
         STORE.managementPrefijos();
         ponerListenerEnSubmit("/register",  funcionControladoraInsert);
    }

    var loginClientListener = function(){
        $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
        activarEstrategias();
        ponerListenerEnSubmit("/validateSession", funcionControladoraLogin);
    };

    var desbloquear = function () {
        STORE.Error.set_message("Pulsa Botón para desbloqueo");
        $("locked").style.display = "";
        $("locked").addEventListener("click", function () {
            llamada = new ajax.CargadorContenidos("/offLocked", function () {
                location.reload();
            });
        });
    }

    var activarEstrategias = function (){
        STORE.Error = STORE.managementError();
        STORE.Submit = STORE.managementSubmit();
        STORE.clientStrategyOne();
    }

    var ponerListenerEnSubmit = function (rutaControlador, funcionControladora) {
        $("submit").addEventListener("click", function () {
            var json = {};
            for (i = 0; i < STORE.list_input.length; i++) {
                json[STORE.list_input[i].id] = STORE.list_input[i].value;
            }
            llamada = new ajax.CargadorContenidos(rutaControlador, funcionControladora, JSON.stringify(json));
        })
    }

    var funcionControladoraLogin = function () {
        var estado = JSON.parse(llamada.req.responseText);

        if (estado.idClient != undefined) {
            sessionStorage.setItem('idClient', estado.idClient);
            location.reload();
        }

        else if (estado.intento < estado.maxIntento) {
            tratarErrores(estado);
            STORE.Error.set_message("Te quedan " + (estado.maxIntento - estado.intento) + " intento(s)");
        }

        else {
            $("cuerpo").innerHTML = STORE.clientTemplate.formSessionLocked;
            $("locked").style.display = "none";
            var tiempoBloqueo = 30;
            window.setInterval(function(){
                $("alertaError").innerText="Estas Bloqueado. Te quedan " + tiempoBloqueo + " seconds";
                tiempoBloqueo--;
                if (tiempoBloqueo <= 0) {
                    desbloquear();
                    clearInterval();
                }
            },1000);
        }
    };

    var tratarErrores = function (estado) {
        if (estado.errorVerificacion != undefined) {
            STORE.Error.on();
            STORE.Error.set_message(estado.errorVerificacion);
        }
        else {
            estado.forEach(function (error) {
                //$(error.control).style.backgroundColor = STORE.Error.get_colorError();
                $(error.control).setAttribute('style', 'backgroundColor:' + STORE.Error.get_colorError() + ' !important');
                STORE.Error.set_message(error.mensajeError);
                STORE.Error.on();
            });
        }
    }

    var funcionControladoraInsert = function () {
        var estado = JSON.parse(llamada.req.responseText);
        if (estado.idClient != "undefined") {
            sessionStorage.setItem('idClient', estado.idClient);
            location.reload();
        }
        else {
            tratarErrores(estado);
        }
    }

    new STORE.DOMObjectLook("op_addClient");
    new STORE.DOMObjectLook("op_initSession");

    $("op_addClient").addEventListener("click",instertClientListener);
    $("op_initSession").addEventListener("click",loginClientListener);
}());
