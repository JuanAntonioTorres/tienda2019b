STORE.namespace('STORE.managementSubmit');

STORE.managementSubmit = function(){

    'use strict';

    var submit = $("submit");

    return {

        off  : function(){

            submit.style.display="none";
        },

        on  : function(){

            var i = 0;

            while (i < STORE.list_input.length) {

                if (STORE.list_input[i].style.backgroundColor === STORE.Error.get_colorError()) {

                    i = STORE.list_input.length;

                }
                i++;
            }

            if (i > STORE.list_input.length) {

                submit.style.display = "none";

            } else {

                submit.style.display = "";

            }

        }

    };

};