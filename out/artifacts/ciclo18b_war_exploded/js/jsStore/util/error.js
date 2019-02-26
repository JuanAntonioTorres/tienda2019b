STORE.namespace('STORE.managementError');

    STORE.managementError = function(){

    'use strict';

    var error = $("alertaError");

    return {

        on  : function(){
            error.style.display = "";
        },

        off  : function(){
            error.style.display = "none";
        },

        set_message : function(message){
            error.innerHTML = message;
        },

        get_colorError : function(){

            return STORE.Color.colorError;
        }

    };

};