var myDiv = new STORE.DOMObjectLook("op_addClient");
var myButton = new STORE.DOMObjectLook("op_initSession");

$("op_addClient").addEventListener("click", function () {
    $("cuerpo").innerHTML = STORE.clientTemplate.insertTemplate;
    STORE.clientStrategyOne();
    ponerListenerEnSubmit();
});
$("op_initSession").addEventListener("click", function () {
    $("cuerpo").innerHTML = STORE.clientTemplate.loginTemplate;
    STORE.clientStrategyOne();
    ponerListenerEnSubmit();
});

function ponerListenerEnSubmit() {

    $("submit").addEventListener("click", function () {
        function Json() {};
        var json = new Json();
        for (i = 0; i < STORE.list_input.length; i++) {
            eval("Json.prototype." + STORE.list_input[i].id + "= '" + STORE.list_input[i].value + "'");
        }
        alert(json);
    })
}

console.log("no me recargo por que *#!!#");