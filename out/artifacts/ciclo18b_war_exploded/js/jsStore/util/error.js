/**
 * Created by Luciano on 16/10/2018.
 */
STORE.namespace('STORE.Error');

'use strict';

STORE.Error.on = function () {
    $("alertaError").style.display = "";
};

STORE.Error.off = function () {
    $("alertaError").style.display = "none";
};

STORE.Error.set_message = function (message) {
    $("alertaError").innerHTML = message;
};

STORE.Error.get_colorError = function () {

    return STORE.Color.colorError;
};

