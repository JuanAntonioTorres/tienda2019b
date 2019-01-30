/**
 * Created by Luciano on 16/10/2018.
 */
STORE.namespace('STORE.Lista');
(function(g){

    'use strict';

    STORE.Lista = {

        next: function (nodo) {

            for (var i = 0; i < STORE.list_input.length; i++) {

                if (STORE.list_input[i] === nodo) {

                    //STORE.list_input[i].style.color = "pink";

                    if ((i + 1 < STORE.list_input.length)) {

                        if (!eval("div_" + STORE.list_input[i + 1].id).style.display == '') {

                            eval("div_" + STORE.list_input[i + 1].id).style.display = '';

                            STORE.list_input[i + 1].style.backgroundColor = STORE.Error.COLOR;
                        }

                    }
                }
            }

        }

    }

})(window)

