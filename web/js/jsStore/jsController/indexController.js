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
            console.dir(json);
        }
        llamada = new ajax.CargadorContenidos(rutaControlador, funcionControladora, JSON.stringify(json));
    })
}

function funcionControladoraLogin() {

    var estado = JSON.parse(llamada.req.responseText);

    if (estado === "") {
        alert(estado);
    }// No está en la BB DD
    else if (estado.type === 'number') {
        alert(estado);// registro valido
    }
    else {
        tratarErrores(estado);
    }

}

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
