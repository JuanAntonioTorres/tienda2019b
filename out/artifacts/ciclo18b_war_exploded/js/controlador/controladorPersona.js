/**
 * Created by Luciano on 14/03/2018.
 */



DAM.namespace('DAM.Persona');
(function(g){
    var ajax = DAM.Ajax;
    var llamada;
    var envio;
    var validar = DAM.Validar;
    var parametro ={
        nodoEnviar:"dclogin",
        nodoError:"dcerror"
    };
    DAM.Persona.misDatosEvent = function(){
        document.getElementById("misDatos").addEventListener("click", DAM.Persona.Opcion);
    };
        // MIS MENU
    DAM.Persona.Opcion = function(){
            event.preventDefault();
            document.getElementById("menuInicio").innerHTML =  P_Persona();
            //....... E v e n t o s ............... ----->
            document.getElementById("dlogin").addEventListener("click",  DAM.Persona.OpcionLogin);
            document.getElementById("dglobales").addEventListener("click",  DAM.Persona.OpcionGlobal);
            document.getElementById("dfoto").addEventListener("click",  DAM.Persona.OpcionFoto);
            document.getElementById("dvolver").addEventListener("click", eval(sessionStorage.getItem('perfil') + ".capturarEventos"));
       // No se puede volver haciendo reload
        };
    // ------  DAM. P_Persona.DatosGlobales
    DAM.Persona.OpcionGlobal = function(){
            llamada = new ajax.CargadorContenidos("/MisDatos", DAM.Persona.MisDatosGlobales);
        };
    DAM.Persona.MisDatosGlobales = function(){
            var misDatos = JSON.parse(llamada.req.responseText);
            var contendorMisDatos =   "<nav class='menuUno'>" +
                "<div class='opcionUno'>Mis Datos Globales</div>";
            contendorMisDatos = contendorMisDatos +
                "<div class='opcionUno'><input type='text' name='nif' id='nif' value='" + misDatos.nif +"' readonly='readonly'</div>" +
                "<div class='opcionUno'><input value='" + misDatos.apellidos + "' id='apellidos'></div>" +
                "<div class='opcionUno'><input value='" + misDatos.nombre + "'  id='nombre'></div>" +
                "<div class='opcionUno'><input value='" + misDatos.codigoPostal + "'  id='codigoPostal'></div>" +
                "<div class='opcionUno'><input value='" + misDatos.domicilio + "' id='domicilio'></div>" +
                "<div class='opcionUno'><input type='date' value='" + misDatos.fechaNacimiento + "' id='fechaNacimiento'></div>" +
                "<div class='opcionUno'><input value='" + misDatos.telefonoFijo + "' id='telefonoFijo'></div>" +
                "<div class='opcionUno'><input value='" + misDatos.telefonoMovil + "' id='telefonoMovil'></div>" +
               // "<div class='opcionUno' id='dcerror'></div>" +
                "<h3  class='panel02Error' id='dcerror'></h3> " +
                "<div class='opcionUno' id='dclogin'><input type='button' value='Cambiar' class='panel02Boton' id='MDenviar' ></div>";

            document.getElementById("cuerpoInicio").innerHTML = contendorMisDatos;
        var apellidos, nombre;

        document.getElementById("dcerror").style.display = "none";
        document.getElementById("dclogin").style.display = "none";

        apellidos = document.getElementById("apellidos");
        apellidos.addEventListener("keyup",  DAM.Persona.validarApellidos, false);

        nombre = document.getElementById("nombre");
        nombre.addEventListener("keyup",   DAM.Persona.validarNombre, false);


        };
    DAM.Persona.validarApellidos = function(){
        parametro.nodo = this.id;
        parametro.valorMinimo = 8;
        parametro.valorMaximo = 50;
        validar.cadenaConespacio(parametro);
        DAM.Persona.validarBotonEnvioGlobal();

    };
    DAM.Persona.validarNombre = function(){
        parametro.nodo = this.id;
        parametro.valorMinimo = 3;
        parametro.valorMaximo = 30;
        validar.cadenaConespacio(parametro);
        DAM.Persona.validarBotonEnvioGlobal();

    }
    DAM.Persona.validarBotonEnvioGlobal = function(){
        var botonEnviar;
        if(  document.getElementById("apellidos").style.background !=  ERROR_COLOR &&
            document.getElementById("nombre").style.background != ERROR_COLOR){
            document.getElementById("dclogin").style.display="";
            document.getElementById("MDenviar").style.display="";
            document.getElementById("MDenviar").addEventListener("click", DAM.Persona.EnviarMisDatosGlobales);
        }
    };
    DAM.Persona.EnviarMisDatosGlobales = function(){
            event.preventDefault();

            var envio = {
                "nif" : document.getElementById("nif").value,
                "nombre" : document.getElementById("nombre").value,
                "apellidos" : document.getElementById("apellidos").value,
                "codigoPostal" : document.getElementById("codigoPostal").value,
                "domicilio" : document.getElementById("domicilio").value,
                "fechaNacimiento" : document.getElementById("fechaNacimiento").value,
                "telefonoFijo" : document.getElementById("telefonoFijo").value,
                "telefonoMovil" : document.getElementById("telefonoMovil").value
            };


            var json = JSON.stringify(envio);

            llamada = new ajax.CargadorContenidos("/UpdateGlobales", DAM.Persona.ResDatos,json);
        };
    DAM.Persona.ResDatos = function(){
            alert(llamada.req.responseText);
            location.reload();
        };

        // ------  DAM. P_Persona.DatosFoto
    DAM.Persona.OpcionFoto = function(){

            llamada = new ajax.CargadorContenidos("/MisDatos", DAM.Persona.MisDatosFoto);
        };
    DAM.Persona.MisDatosFoto = function(){

            var misDatos = JSON.parse(llamada.req.responseText);

            var contendorMisDatos =   "<nav class='menuUno'>" +
                "<div class='opcionUno'>Mi Foto</div>";
            contendorMisDatos = contendorMisDatos +
                "<form action='/Foto' method='post' enctype='multipart/form-data'>" +
                "<div class='opcionUno'><input type='hidden' name='nif' value='" + misDatos.nif +"' readonly='readonly'</div>" +
                "<div class='opcionUno'><img src='img/fotos/" + misDatos.imagen +"' name='myimagen'></div>"+
                "<div class='opcionUno'><input name='imagen' id='imagen' type='hidden' value=' " + misDatos.imagen + "'/></div>" +
                "<div class='opcionUno'><input type='file' name='foto' id='foto' accept='image/*'></div>"+
                "<input type='submit' value='Enviar' id='submit'></form> ";

            document.getElementById("cuerpoInicio").innerHTML = contendorMisDatos;
            document.getElementById("submit").style.display = "none";
            document.getElementById("foto").addEventListener("change", DAM.Persona.MostrarEnviarFoto);
        };
    DAM.Persona.MostrarEnviarFoto = function(){
            document.getElementById("submit").style.display = "";
        }

        // ------  DAM. P_Persona.DatosLogin
    DAM.Persona.OpcionLogin = function(){
            llamada = new ajax.CargadorContenidos("/GetLogin", DAM.Persona.MisDatosLogin);
        }
    DAM.Persona.MisDatosLogin = function(){
            var misDatos = JSON.parse(llamada.req.responseText);
            var contendorMisDatos =   "<nav class='menuUno'>" +
                "<div class='opcionUno'>Mis Datos Login</div>";
            contendorMisDatos = contendorMisDatos +
                "<div class='opcionUno'><input type='text' name='nif' id='nif' value='" + misDatos.nif +"' readonly='readonly' ></div>" +
                "<div class='opcionUno'><input type='text' <input value='" + misDatos.email + "' id='email' readonly='readonly' ></div>" +
                "<div class='opcionUno'><input  value='" + misDatos.password + "'  id='password'></div>" +
                "<div class='opcionUno'><input type='text' value='new email'  id='emailnew' ></div>" +
                "<div class='opcionUno' id='dcerror'><input type='text'  id='MDerror' ></div>" +
                "<div class='opcionUno' id='dclogin'><input type='button' value='Cambiar' class='panel02Boton' id='MDenviar' ></div>";

            document.getElementById("cuerpoInicio").innerHTML = contendorMisDatos;

            var emailnew, password;

            document.getElementById("dcerror").style.display = "none";
            document.getElementById("dclogin").style.display = "none";

            emailnew = document.getElementById("emailnew");
            emailnew.addEventListener("keyup",  DAM.Persona.validarLoginEmail, false);

            password = document.getElementById("password");
            password.addEventListener("keyup",   DAM.Persona.validarLoginPassword, false);

        }
    DAM.Persona.validarLoginEmail = function(){
            parametro.nodo = this.id;
            parametro.valorMinimo = 5;
            parametro.valorMaximo = 30;
            validar.email(parametro);
        DAM.Persona.validarBotonEnvio();
        };
    DAM.Persona.validarLoginPassword = function(){
            parametro.nodo = this.id;
            validar.password(parametro);
        DAM.Persona.validarBotonEnvio();
        };
    DAM.Persona.validarBotonEnvio = function(){
            var botonEnviar;
            if(  document.getElementById("emailnew").style.background ==  VALIDO_COLOR &&
                document.getElementById("password").style.background ==  VALIDO_COLOR){
                document.getElementById("dclogin").style.display="";
                document.getElementById("MDenviar").style.display="";
                document.getElementById("MDenviar").addEventListener("click", DAM.Persona.EnviarMisDatosLogin);
            }
        };
    DAM.Persona.EnviarMisDatosLogin = function(){
            event.preventDefault();
            var envio = {
                "nif" : document.getElementById("nif").value,
                "email" : document.getElementById("email").value,
                "loginPassword" : document.getElementById("password").value,
                "loginUsuario" : document.getElementById("emailnew").value
            };
            var json = JSON.stringify(envio);
            llamada = new ajax.CargadorContenidos("/UpdateLoginUsuario", DAM.Persona.ResDatos,json);
        }
}) (window);