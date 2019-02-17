(function(){

    var ajax = STORE.Ajax;
    var llamada;
    var instertClientListener;
    var loginClientListener ;
    var activarEstrategias ;
    var ponerListenerEnSubmit ;
    var funcionControladoraLogin ;
    var funcionControladoraInsert ;
    var desbloquear ;
    var tratarErrores ;


    instertClientListener = function() {
        $("cuerpo").innerHTML = STORE.clientTemplate.insertTemplate;
         activarEstrategias();
         ponerListenerEnSubmit("/register",  funcionControladoraInsert);
    }

    loginClientListener = function(){
        $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
        activarEstrategias();
        ponerListenerEnSubmit("/validateSession", funcionControladoraLogin);
    };

    desbloquear = function () {
        STORE.Error.set_message("Pulsa Botón para desbloqueo");
        $("locked").style.display = "";
        $("locked").addEventListener("click", function () {
            llamada = new ajax.CargadorContenidos("/offLocked", function () {
                location.reload();
            });
        });
    }

    activarEstrategias = function (){
        STORE.Error = STORE.managementError();
        STORE.Submit = STORE.managementSubmit();
        STORE.clientStrategyOne();
    }

    ponerListenerEnSubmit = function (rutaControlador, funcionControladora) {
        $("submit").addEventListener("click", function () {
            var json = {};
            for (i = 0; i < STORE.list_input.length; i++) {
                json[STORE.list_input[i].id] = STORE.list_input[i].value;
            }
            llamada = new ajax.CargadorContenidos(rutaControlador, funcionControladora, JSON.stringify(json));
        })
    }

    funcionControladoraLogin = function () {
        alert("voy a petar");
        //preguntar por que se pasa JSON.dateParser
        var estado = JSON.parse(llamada.req.responseText);

        if (estado.nif != undefined) {
            //TODO cambiar todo lo del nif por un id
            sessionStorage.setItem('idCliente', estado.nif);
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

    tratarErrores = function (estado) {
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

    funcionControladoraInsert = function () {
        var estado = JSON.parse(llamada.req.responseText);

        if (estado.nif != "undefined") {
            location.reload();
        }
        else {
            tratarErrores(estado);
        }
    }

    $("op_addClient").addEventListener("click",instertClientListener);
    $("op_initSession").addEventListener("click",loginClientListener);
}());
