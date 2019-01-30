/**
 * Created by Luciano on 03/10/2018.
 */

STORE.namespace('STORE.ValidacionUtil');
(function(g){

    'use strict';

    STORE.ValidacionUtil  = {

        addLimitePatron : function(parametro) {

            parametro.limite = STORE.getLimite(parametro.nodo);

            if (parametro.limite.limiteInferior > 0) {

                parametro.patron += "{" + parametro.limite.limiteInferior  + "," + parametro.limite.limiteSuperior + "})$";

                parametro.mensajeError +=  " ; entre "  + parametro.limite.limiteInferior + ", " + parametro.limite.limiteSuperior;

            } else {

                parametro.patron +=  "*)$";
            }

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro),parametro);

        },

        validarExpRegular : function(parametro){

            parametro.expregular = new RegExp( parametro.patron);

            return parametro.expregular.test(parametro.nodo.value);
        },

        validarListaValores : function(miValue, lista){

            var iterador = lista.values();

            var result = false;

            for (let value of iterador) {

                if (value == miValue) {
                    result = true;
                    break;
                }
            }

            return result;
        },

        valorarConsecuencia :  function (valido, parametro) {

            if (valido){

                parametro.nodo.style.backgroundColor = STORE.Color.colorValido;

                STORE.Error.off();

                STORE.Submit.on();

                STORE.Lista.next(parametro.nodo);

            } else {

                STORE.Error.set_message(parametro.mensajeError);

                parametro.nodo.style.backgroundColor = STORE.Error.get_colorError();

                STORE.Error.on();

                STORE.Submit.off();
            }

        },

        validarTodoNumeros: function(cadena) {

            var i, j = 0;

            var unNumero = "";

            var temporal = 0;

            var  numeros = ["0","1","2","3","4","5","6","7","8","9"];

            for(i = 0; i < cadena.length; i++) {

                unNumero = cadena.substr(i, i+1);

                if(numeros.indexOf(unNumero)) {
                    temporal++;
                }
            }

            if(temporal != cadena.length) {
                return false;
            }
            return true;
        },

        validarLetraDNI: function(dni) {

            var letra_dni = dni.substr(8,1);

            var numeros_dni = dni.substr(0,8);

            var letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

            var resto = numeros_dni % 23;

            var letra = letras[resto];

            return (letra == letra_dni);
        },

        estrategiaUnoAUno :  function (valido, parametro) {

            if (valido) {

                parametro.nodo.style.backgroundColor = STORE.Color.colorValido;

                STORE.Error.off();

                STORE.Submit.on();

                STORE.Lista.next(parametro.nodo);

            } else {

                STORE.Error.set_message(parametro.mensajeError);

                parametro.nodo.style.backgroundColor = STORE.Error.get_colorError();

                STORE.Error.on();

                STORE.Submit.off();
            }

        }
    }
})(window)


STORE.namespace('STORE.ValidacionExpresionRegular');
(function(g){

    'use strict';

    var parametro = {};

    STORE.ValidacionExpresionRegular = {

        validarCodigoPostal : function(evt){

            parametro.nodo = evt.target;

            parametro.patron = "^(?:0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3})$"; // Número entre 01000 y 52999

            parametro.mensajeError = "ERROR: Código Posrtal 5 caracteres";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro),parametro);
        },

        validarEmail : function (evt) {

            parametro.nodo = evt.target;

            parametro.patron = "^([a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]{3,20}(?:\\.[a-zA-Z0-9-]{2,3}))$";

            parametro.mensajeError = "Email no valido";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro), parametro);
        },

        validarDni : function (evt) {

            parametro.nodo = evt.target;

            parametro.mensajeError = "DNI no válido";

            var los8numeros = parametro.nodo.value.substr(0,8);

            if( parametro.nodo.value.length != 9 || parametro.nodo.value.substr(8,1)  == false ) {

                parametro.mensajeError = "DNI distinta a 9 caracteres o que el último caracter no es una letra";

                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
            }

            STORE.ValidacionUtil.valorarConsecuencia( (STORE.ValidacionUtil.validarTodoNumeros(los8numeros) == true && STORE.ValidacionUtil.validarLetraDNI(parametro.nodo.value)) , parametro);
        },

        validarDniNieCif : function (evt) {

            parametro.nodo = evt.target;

            parametro.mensajeError = "DNI no válido";

            var los8numeros = parametro.nodo.value.substr(0,8);

           if( parametro.nodo.value.length == 9 && parametro.nodo.value.substr(8,1) ) {

               if (STORE.ValidacionUtil.validarTodoNumeros(los8numeros) && STORE.ValidacionUtil.validarLetraDNI(parametro.nodo.value)){

                   STORE.ValidacionUtil.valorarConsecuencia(true,parametro);
                   return true;
               }
            }

            // NIE

            var nie = "";
            var esValido = false;
            var i = 1;
            var caracterASCII = 0;
            var letra = ' ';
            var miNIE = 0;
            var resto = 0;
            var asignacionLetra = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X','B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
            var patronLetra =  "^([a-zA-Z])$";
            var expregular = new RegExp(patronLetra);


            if( parametro.nodo.value.length == 9 && expregular.test(parametro.nodo.value.substr(8,1) )

                && parametro.nodo.value.substr(0,1).toUpperCase()=="X"
                || parametro.nodo.value.substring(0,1).toUpperCase() == "Y"
                || parametro.nodo.value.substring(0,1).toUpperCase() == "Z") {

                do {
                    caracterASCII = parametro.nodo.value.codePointAt(i);
                    esValido = (caracterASCII > 47 && caracterASCII < 58);
                    i++;

                } while (i < parametro.nodo.value.length - 1 && esValido);

                if (esValido && parametro.nodo.value.substring(0, 1).toUpperCase() == "X") {
                    nie = "0" + parametro.nodo.value.substring(1, 9);
                } else if (esValido && parametro.nodo.value.substring(0, 1).toUpperCase() == "Y") {
                    nie = "1" + parametro.nodo.value.substring(1, 9);
                } else if (esValido && parametro.nodo.value.substring(0, 1).toUpperCase() == "Z") {
                    nie = "2" + parametro.nodo.value.substring(1, 9);
                }

                if (esValido) {
                    letra = nie.substr(8).toUpperCase();
                    miNIE = nie.substr(0, 8);
                    resto = miNIE % 23;
                    esValido = (letra == asignacionLetra[resto]);
                }
            }
            if (esValido){

                STORE.ValidacionUtil.valorarConsecuencia(true,parametro);
                return true;
            }

            // CIF

            var par = 0;
            var non = 0;
            var letras = "ABCDEFGHKLMNPQS";
            var letra = parametro.nodo.value.charAt(0);

            parametro.mensajeError ='El documento ni es NIF ni NIE ni CIF';

            if (parametro.nodo.value.length!=9)
            {
                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
                return false;
            }
            if (letras.indexOf(letra.toUpperCase())==-1)
            {
                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
                return false;
            }
            for (var zz=2;zz<8;zz+=2)
            {
                par = par+parseInt(parametro.nodo.value.charAt(zz));
            }

            for (var zz=1; zz<9; zz+=2)
            {
                var  nn = 2*parseInt(parametro.nodo.value.charAt(zz));
                if (nn > 9) nn = 1+(nn-10);
                non = non + nn;
            }
            var parcial = par + non;

            var control = (10 - ( parcial % 10));

            if (control==10) control=0;

            if (control  == parametro.nodo.value.charAt(8))
            {
                STORE.ValidacionUtil.valorarConsecuencia(true,parametro);
                return false;
            }

            STORE.ValidacionUtil.valorarConsecuencia(false,parametro);

        },

        validarDomicilio : function(evt){

            parametro.nodo = evt.target;

            parametro.patron = "^([0-9ºª.:,/a-zA-ZñÑáéíóúÜüÁÉÍÓÚ\\s]";

            parametro.mensajeError = "Domicilio NO válido";

            STORE.ValidacionUtil.addLimitePatron(parametro);

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro), parametro);

    },

        validarFecha: function (evt) {

            // aaaa-mm-dd

            parametro.nodo = evt.target;

            parametro.patron = "^(\\d{4})(\\-)(0[1-9]|1[012])(\\-)(0[1-9]|[1-2]\\d|3[01])$";

            parametro.mensajeError = "Fecha NO válida";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro), parametro);

        },

        validarLetrasConEspacio : function(evt){

            parametro.nodo = evt.target;

            parametro.patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]";

            parametro.mensajeError = "ERROR: Letras con Espacio ";

            STORE.ValidacionUtil.addLimitePatron(parametro);

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro),parametro);
        },

        validarLetrasSinEspacio : function(evt){

            parametro.nodo = evt.target;

            parametro.patron =  "^([a-zA-ZñÑáéíóúÁÉÍÓÚ]";

            parametro.mensajeError = "ERROR: Letras sin Espacio ";

            STORE.ValidacionUtil.addLimitePatron(parametro);

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro),parametro);

        },

        validarNIE : function(evt){

            parametro.nodo = evt.target;

            parametro.mensajeError = "NIE no válido";
            var nie = "";
            var esValido = false;
            var i = 1;
            var caracterASCII = 0;
            var letra = ' ';
            var miNIE = 0;
            var resto = 0;
            var asignacionLetra = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X','B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
            var patronLetra =  "^([a-zA-Z])$";
            var expregular = new RegExp(patronLetra);


            if( parametro.nodo.value.length == 9 && expregular.test(parametro.nodo.value.substr(8,1) )

                && parametro.nodo.value.substr(0,1).toUpperCase()=="X"
                || parametro.nodo.value.substring(0,1).toUpperCase() == "Y"
                || parametro.nodo.value.substring(0,1).toUpperCase() == "Z") {

                do {
                    caracterASCII = parametro.nodo.value.codePointAt(i);
                    esValido = (caracterASCII > 47 && caracterASCII < 58);
                    i++;

                } while(i < parametro.nodo.value.length - 1 && esValido);

                if(esValido && parametro.nodo.value.substring(0,1).toUpperCase() == "X") {
                    nie = "0" + parametro.nodo.value.substring(1,9);
                } else if(esValido && parametro.nodo.value.substring(0,1).toUpperCase() == "Y") {
                   nie= "1" + parametro.nodo.value.substring(1,9);
                } else if(esValido && parametro.nodo.value.substring(0,1).toUpperCase() == "Z") {
                    nie = "2" + parametro.nodo.value.substring(1,9);
                }
                alert("nie" + nie);
                if(esValido) {
                    letra =  nie.substr(8).toUpperCase();
                    miNIE = nie.substr(0,8);
                    alert("miNIE: " + miNIE)
                    resto = miNIE % 23;

                    esValido = (letra == asignacionLetra[resto]);
                }

                STORE.ValidacionUtil.valorarConsecuencia(esValido,parametro);
            }

        },

        validarCIFNIF : function(evt){

            parametro.nodo = evt.target;

            parametro.mensajeError = "NIFCIF no válido";

            var par = 0;
            var non = 0;
            var letras = "ABCDEFGHKLMNPQS";
            var letra = parametro.nodo.value.charAt(0);

            if (parametro.nodo.value.length!=9)
            {
                parametro.mensajeError ='El Cif debe tener 9 dígitos';
                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
                return false;
            }
            if (letras.indexOf(letra.toUpperCase())==-1)
            {
                parametro.mensajeError = "El comienzo del Cif no es válido";
                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
                return false;
            }
            for (var zz=2;zz<8;zz+=2)
            {
                par = par+parseInt(parametro.nodo.value.charAt(zz));
            }

            for (var zz=1; zz<9; zz+=2)
            {
               var  nn = 2*parseInt(parametro.nodo.value.charAt(zz));
                if (nn > 9) nn = 1+(nn-10);
                non = non + nn;
            }
            var parcial = par + non;

            var control = (10 - ( parcial % 10));

            if (control==10) control=0;

            if (control  !=  parametro.nodo.value.charAt(8))
            {
                parametro.mensajeError = "El Cif no es válido";
                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
                return false;
            }
            STORE.ValidacionUtil.valorarConsecuencia(true,parametro);
        },

        validarNumeroMovil: function (evt) {

            parametro.nodo = evt.target;

            parametro.patron = STORE.prefix_input.regExp;

            parametro.maximo = STORE.prefix_input.maximo;

            parametro.mensajeError = ("ERROR: El número de móvil debe tener: " + parametro.maximo + " dígitos");

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro),parametro);
        },

        validarPassword : function (evt) {

            // Minimo 8 caracteres y Maximo 15
            // Al menos una letra mayúscula y Al menos una letra minucula
            // Al menos un dígito y Al menos 1 caracter especial
            //  No espacios en blanco

            parametro.nodo = evt.target;

            parametro.patron =   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!-_%*?&])[A-Za-z\\d$@$!-_%*?&]{8,15}[\\S]$";

            parametro.mensajeError = "ERROR: Contraseña incorrecta ";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro), parametro);
        },

        validarTelefonoFijo: function (evt) {

            parametro.nodo = evt.target;

            parametro.patron = "^(\\+34|0034|34)?[6789]\\d{8}$";

            parametro.mensajeError = "Teléfono Fijo NO válido";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro), parametro);

        },

        validarUsuario: function (evt) {

            parametro.nodo = evt.target;

           // Los usuarios tienen 7 dígitos.
                //El primer dígito es una letra.
                //Los dígitos 2 y 3 pueden ser letras o números.
                //Los 4 últimos son números.

            parametro.patron = "^[A-Za-z]{1}([A-Za-z]{2}|[0-9]{2}|[A-Za-z][0-9]{2})([0-9]{4})$";

            parametro.mensajeError = "Usuario no valido";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarExpRegular(parametro), parametro);
    }

    }

})(window)

//STORE.namespace('STORE.ValidacionExpresionRegularLimite'); herencia paralela

STORE.namespace('STORE.ValidarListaValores');
(function(g) {

    'use strict';

    var parametro = {};

    STORE.ValidarListaValores = {

        validarSexo : function(evt) {

            parametro.nodo = evt.target;

            var sexo = [ 'm', 'f'];

            parametro.mensajeError = "ERROR: Selecciona Hombre o mujer";

            STORE.ValidacionUtil.valorarConsecuencia(STORE.ValidacionUtil.validarListaValores(parametro.nodo.value, sexo),parametro);

        }

    }

})(window)

STORE.namespace('STORE.ValidarFicheroName');
(function(g) {

    'use strict';

    var parametro = {};

    STORE.ValidarFicheroName = {

        validarImagenName : function(evt) {

            parametro.nodo = evt.target;

            var tipo = ['jpg', 'png'];

            parametro.mensajeError = "ERROR:Selecciona nueva imagen:";

            if (STORE.ValidacionUtil.validarListaValores(STORE.File.getFileExtensionFromURI(parametro.nodo.value), tipo)){

                parametro.patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ0_9\\\:\.\/])"; //"(?:\w+:)?\/\/[^/]+([^?#]+)";  //"^([a-zA-Z]:)?(\\{2}|\/)?([a-zA-Z0-9\\s_@-^!#$%&+={}\[\]]+(\\{2}|\/)?)+(\.jpg|\.png+)?$";

                parametro.mensajeError += " Cualquier caracter ";

               if( STORE.ValidacionUtil.validarExpRegular(parametro))
               {
                   parametro.patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ0_9\\s])";

                   parametro.mensajeError = "ERROR:Letras y numeros con Espacio ";

                   parametro.text = STORE.File.getFileNameFromURI(parametro.nodo.value);

                   parametro.expregular = new RegExp( parametro.patron);

                  STORE.ValidacionUtil.valorarConsecuencia(parametro.expregular.test(STORE.File.getFileNameFromURI(parametro.nodo.value)),parametro);

                  $("idFile").value = parametro.nodo.value;
               }
               else {

                   STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
               }

            } else {

                   STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
            }
        }


    }

})(window)

STORE.namespace('STORE.ValidarEstrategiaUnoAUno');
(function(g) {

    'use strict';

    var parametro = {};

    STORE.ValidarEstrategiaUnoAUno = {

        validarImagenName : function(evt) {

            parametro.nodo = evt.target;

            var tipo = ['jpg', 'png'];

            parametro.mensajeError = "ERROR:Selecciona nueva imagen:";

            if (STORE.ValidacionUtil.validarListaValores(STORE.File.getFileExtensionFromURI(parametro.nodo.value), tipo)){

                parametro.patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ0_9\\\:\.\/])"; //"(?:\w+:)?\/\/[^/]+([^?#]+)";  //"^([a-zA-Z]:)?(\\{2}|\/)?([a-zA-Z0-9\\s_@-^!#$%&+={}\[\]]+(\\{2}|\/)?)+(\.jpg|\.png+)?$";

                parametro.mensajeError += " Cualquier caracter ";

                if( STORE.ValidacionUtil.validarExpRegular(parametro))
                {
                    parametro.patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ0_9\\s])";

                    parametro.mensajeError = "ERROR:Letras y numeros con Espacio ";

                    parametro.text = STORE.File.getFileNameFromURI(parametro.nodo.value);

                    parametro.expregular = new RegExp( parametro.patron);

                    STORE.ValidacionUtil.valorarConsecuencia(parametro.expregular.test(STORE.File.getFileNameFromURI(parametro.nodo.value)),parametro);

                    $("idFile").value = parametro.nodo.value;
                }
                else {

                    STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
                }

            } else {

                STORE.ValidacionUtil.valorarConsecuencia(false,parametro);
            }
        }


    }

})(window)
