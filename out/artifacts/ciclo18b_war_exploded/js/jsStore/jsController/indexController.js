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
        function Json() {
        };
        var json = new Json();
        for (i = 0; i < STORE.list_input.length; i++) {
            eval("Json.prototype." + STORE.list_input[i].id + "= '" + STORE.list_input[i].value + "'");
        }
        llamada = new ajax.CargadorContenidos(rutaControlador, funcionControladora, json);
    })
}

function funcionControladoraLogin () {

    var estado = JSON.parse(llamada.req.responseText);

    if (estado === 0) {
        alert(estado);
    }// No está en la BB DD
    else if (estado.type === 'number') {
        alert(estado);// registro valido
    }

    tratarErrores(estado);

}

function tratarErrores(estado){
    estado.forEach(function (error) {
        //$(error.control).style.backgroundColor = STORE.Error.get_colorError();
        $(error.control).setAttribute('style', 'backgroundColor:' + STORE.Error.get_colorError() + ' !important');
        $("alertaError").innerText = error.mensajeError;
        STORE.Error.on();
    });
}

function funcionControladoraInsert () {
    var estado = JSON.parse(llamada.req.responseText);

    if (typeof estado === "number") {
        if (estado == 0) {
            alert(estado);//cliente no insertado
        }
        else alert(estado); //cliente insertado

    }
    else {
        tratarErrores(estado);

    }
}
