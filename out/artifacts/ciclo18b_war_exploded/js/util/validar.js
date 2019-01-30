/**
 * Created by Luciano on 14/01/2018.
 */
DAM.namespace('DAM.Validar');
(function(g){
    'use strict';
    DAM.Validar = {

            cadenaSinespacio : function(parametros){
                 var expregular = new RegExp("^([A-Za-z]{" + parametros.valorMinimo  + "," + parametros.valorMaximo + "})$");
                 var mensajeError = "Introduce cadena sin espacio y una longitud entre "+ parametros.valorMinimo +" y "+ parametros.valorMaximo + " caracteres";

                DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
            },
            cadenaConespacio : function(parametros){
                var expregular = new RegExp("^([A-Za-z\\s]{" + parametros.valorMinimo  + "," + parametros.valorMaximo + "})$");
                var mensajeError = "Introduce cadena (sin/con espacio) y una longitud entre "+ parametros.valorMinimo +" y "+ parametros.valorMaximo + " caracteres";

                DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
            },

            cadenaNumeroConespacio : function(parametros){
                 var expregular = new RegExp("^([A-Za-z0-9\\s]{" + parametros.valorMinimo  + "," + parametros.valorMaximo + "})$");
                 var mensajeError = "Introduce cadena (sin/con espacio) y una longitud entre "+ parametros.valorMinimo +" y "+ parametros.valorMaximo + " caracteres";

                DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
             },
            cadenaNumeroSinespacio : function(parametros){
                var expregular = new RegExp("^([A-Za-z0-9]{" + parametros.valorMinimo  + "," + parametros.valorMaximo + "})$");
                var mensajeError = "Introduce cadena (sin/con espacio) y una longitud entre "+ parametros.valorMinimo +" y "+ parametros.valorMaximo + " caracteres";

                DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
             },
            usuario : function(parametros){
                var expregular = new RegExp("^([a-z0-9]{" + parametros.valorMinimo  + "," + parametros.valorMaximo + "})$");
                var mensajeError = "Introduce cadena en minusculas sin espacio) y una longitud entre "+ parametros.valorMinimo +" y "+ parametros.valorMaximo + " caracteres";

                DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
            },
            password : function(parametros){
                //String pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
                //  var expregular = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                //var expregular = new RegExp("^(?=(?:.*(\d|[$@])){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{1,}$");
                // var expregular = new RegExp("^(?=(?:.*\d){2})(?=.*[A-Z])(?=.*[a-z])(?!.{0,4}(.)(?:.*\1){3})\S{8,}$");
                //var expregular = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                // var expregular = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$");
                // var expregular = new RegExp("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$");
               var  expregular = new RegExp("^([A-Za-z0-9][\\w]{5,})$");
               var mensajeError = "must be 5 characters or longer, including 1 uppercase letter, 1 special character and alphanumeric characters";

               DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
            },
            email : function(parametros){
                var  expregular = new RegExp("^(.+)@(.+)$");
                var mensajeError = "Email erróneo";
                DAM.Validar.validarNodo(parametros.nodo, parametros.nodoEnviar, parametros.nodoError, expregular, mensajeError);
            },
            validarNodo : function(nodo,nodoEnviar,nodoError,expregular,mensajeError){
                     var minodo = document.getElementById(nodo);
                     var elemento = minodo.value;
                     var errores = document.getElementById(nodoError);
                     var botonEnviar = document.getElementById(nodoEnviar);
                     if(!expregular.test(elemento)) {
                         botonEnviar.style.display="none";
                         minodo.style.background = ERROR_COLOR;
                         errores.innerHTML = mensajeError;
                         errores.style.display="";
                         return false;
                     }
                    minodo.style.background = VALIDO_COLOR;
                    errores.innerHTML ="";
                    errores.style.display="none";
            }
    };
})(window);


