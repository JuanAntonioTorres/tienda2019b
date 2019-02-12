STORE.namespace('STORE.clientStrategyOne');

STORE.clientStrategyOne = function(){

    'use strict';

    var form = $("client_register");

    STORE.list_input = form.querySelectorAll("[data-functioncallback]");

    eval("div_" + STORE.list_input[0].id).style.display = '';

    for (var i = 1; i < STORE.list_input.length; i++) {

        eval("div_" + STORE.list_input[i].id).style.display = 'none';
    }

    STORE.Error.off();
    STORE.Submit.off();

    for (var i = 0; i < STORE.list_input.length; i++) {

        STORE.list_input[i].addEventListener("input",eval("STORE." + STORE.list_input[i].dataset.functioncallback),false);

        if(STORE.list_input[i].value == ''){
            STORE.list_input[i].style.backgroundColor = STORE.Error.get_colorError();
        }
    }
};
