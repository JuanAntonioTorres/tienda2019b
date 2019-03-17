(function () {

        var ajax = STORE.Ajax;
        var llamada;

        //TODO sacar estas funciones a un nivel superior y en index controller tb

        var activarEstrategias = function () {
            STORE.Error = STORE.managementError();
            STORE.Submit = STORE.managementSubmit();
            STORE.clientStrategyOne();
        }

        var activarEstrategiasSinOneByOne = function () {
            STORE.Error = STORE.managementError();
            STORE.Submit = STORE.managementSubmit();
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

        var tratarErrores = function (estado) {
            if (estado.errorVerificacion != undefined) {
                STORE.Error.on();
                STORE.Error.set_message(estado.errorVerificacion);
            }
            else {
                estado.forEach(function (error) {
                    $(error.control).style.backgroundColor = STORE.Error.get_colorError();
                    $(error.control).setAttribute('style', 'backgroundColor:' + STORE.Error.get_colorError() + ' !important');
                    STORE.Error.set_message(error.mensajeError);
                    STORE.Error.on();
                });
            }
        }

        //

        var funcionRecogerResultado = function () {
            var estado = JSON.parse(llamada.req.responseText);
            if (estado.estado == "OK") {
                location.reload();
            }
            else {
                tratarErrores(estado);
            }
        };


        var funcionControladoraRevalidateLogin = function (plantilla, funcionControladora, rutaControlador, oneByOne) {
            var estado = JSON.parse(llamada.req.responseText);

            if (estado.idClient != undefined) {
                $("cuerpo").innerHTML = plantilla;
                if(oneByOne==undefined || oneByOne === true){
                    activarEstrategias();
                }
                else{
                    activarEstrategiasSinOneByOne();
                }
                ponerListenerEnSubmit(rutaControlador, funcionControladora);
            }

            else if (estado.intento < estado.maxIntento) {
                tratarErrores(estado);
                STORE.Error.set_message("Te quedan " + (estado.maxIntento - estado.intento) + " intento(s)");
            }

            else {
                //bloquear en base de datos
                alert("deberia bloquearte en base de datos pero no me ha dado tiempo todavia")
            }
        }

//TODO revisar nombre de controladores
//listeners
        var updateLoginClientListener = function () {
            $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
            activarEstrategias();
            var nextListener = function(){
                funcionControladoraRevalidateLogin(STORE.clientTemplate.updateLoginClient,funcionRecogerResultado,"/valiCliUpdateLogin");
            }
            ponerListenerEnSubmit("/validateSession",nextListener);
        }

        var updateDaperClientListener = function () {
            $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
            activarEstrategias();
            var nextListener = function(){
                funcionControladoraRevalidateLogin(STORE.clientTemplate.updateDaperClient,funcionRecogerResultado,"/updatePersonalData",false);
            }
            ponerListenerEnSubmit("/validateSession",nextListener);
        };

        var updateAvatarClientListener = function () {
            $("cuerpo").innerHTML = STORE.clientTemplate.updateAvatarClient;
        };

        var deleteClientListener = function () {
            $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
            activarEstrategias();
            var nextListener = function(){
                funcionControladoraRevalidateLogin(STORE.clientTemplate.delete,funcionRecogerResultado,"/delete");
            }
            ponerListenerEnSubmit("/validateSession",nextListener);
        };

        new STORE.DOMObjectLook("op_updateLoginClient");
        new STORE.DOMObjectLook("op_updateDaperClient");
        new STORE.DOMObjectLook("op_updateAvatarClient");
        new STORE.DOMObjectLook("op_deleteClient");
        $("op_updateLoginClient").addEventListener("click", updateLoginClientListener);
        $("op_updateDaperClient").addEventListener("click", updateDaperClientListener);
        $("op_updateAvatarClient").addEventListener("click", updateAvatarClientListener);
        $("op_deleteClient").addEventListener("click", deleteClientListener);
    }
    ()
)
;
