STORE.namespace('STORE.managementPrefijos');

STORE.managementPrefijos = function() {
    STORE.Utiles = {
        cambiarExpRegular() {
            var selectedValue = prefijo.options[prefijo.selectedIndex].valueOf().innerText;
            console.log(selectedValue);
            for (var index in PREFIJOS) {
                if (PREFIJOS[index].value === selectedValue) {
                    STORE.prefix_input.regExp = PREFIJOS[index].expresionRegularMovil;
                    STORE.prefix_input.minimo = PREFIJOS[index].minimo;
                    STORE.prefix_input.maximo = PREFIJOS[index].maximo;
                    STORE.Utiles.limitarCamposDeTexto("mobile", PREFIJOS[index].maximo);
                }
            }
        },
        limitarCamposDeTexto: function (campo, limite) {
            document.getElementById(campo).setAttribute("maxlength", limite);
        }

    }

// Lista de expresiones regulares.
    const NUMERO_SPAIN_MOVIL = /^[6|7][0-9]{8}$/;
    const NUMERO_US_MOVIL = /^[0-9]{10}$/;

// Objeto prefijo con todos los refijos soportados.
    const PREFIJOS = [
        {
            "prefijo": "ES",
            "value": "+34",
            "maximo": "9",
            "flag": "spain.png",
            "expresionRegularMovil": NUMERO_SPAIN_MOVIL
        },
        {
            "prefijo": "US",
            "value": "+1",
            "maximo": "10",
            "flag": "us.png",
            "expresionRegularMovil": NUMERO_US_MOVIL,
            "default": "true"
        }
    ];

    STORE.namespace('STORE.prefix_input');

    STORE.prefix_input = document.getElementById("prefijo");
        var prefijo = STORE.prefix_input;
        for (var index in PREFIJOS) {
            prefijo.options[prefijo.options.length] = new Option(PREFIJOS[index].value, index, PREFIJOS[index].default, PREFIJOS[index].default);
            if (PREFIJOS[index].default) {
                STORE.prefix_input.regExp = PREFIJOS[index].expresionRegularMovil;
                STORE.Utiles.limitarCamposDeTexto("mobile", PREFIJOS[index].maximo);
                console.log("El valor por defecto es: " + PREFIJOS[index].prefijo);
            }
            console.log("Añadida opcion");

        }

// Action Listener para cambios de prefijo.
    prefijo.addEventListener("change", STORE.Utiles.cambiarExpRegular);
}