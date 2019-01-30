/**
 * Created by Luciano on 12/01/2018.
 */


DAM.namespace('DAM.Inicio');

//import * as P_login from '/plantilla/login.js';

(function(g){
    'use strict';
    var validar = DAM.Validar;
    var parametro ={
        nodoEnviar:"loginEnviar",
        nodoError:"loginError"
    };
    var ajax = DAM.Ajax;
    var llamada;
    var envio;
    DAM.Inicio.perfil = "";
    DAM.Inicio.capturarEventos = function(){
                // headerInicio
        document.getElementById("imagen1").innerHTML = P_dadoHarnina();
        document.getElementById("menuInicio").innerHTML = P_menuInicio();
        document.getElementById("imagen2").innerHTML = P_dadoInformatica();
                 // mainInicio
        document.getElementById("cuerpoInicio").innerHTML = P_bienvenidaInicio();
                //pieInicio
        document.getElementById("pieInicio").innerHTML = P_pieInicio();


        // ....................M E N U  P R I N C I P A L --------------
        //....... Bienvenido ............... ----->
        document.getElementById("bienvenidaInicio").addEventListener("click", DAM.Inicio.bienvenidaInicio);
        //....... Login ............... ----->
        document.getElementById("login").addEventListener("click", DAM.Inicio.login);
        //....... Alta ............... ----->
        document.getElementById("altausuario").addEventListener("click", DAM.Inicio.altausuario);
    };
    DAM.Inicio.bienvenidaInicio = function() {
        event.preventDefault();
        document.getElementById("cuerpoInicio").innerHTML = P_bienvenidaInicio();
    }
    DAM.Inicio.login = function() {
        event.preventDefault();
        document.getElementById("cuerpoInicio").innerHTML = P_login();

        document.getElementById("loginError").style.display = "none";
        document.getElementById("loginEnviar").style.display = "none";

        document.getElementById("avisoEnviar").style.display = "none";

        document.getElementById("clavebloqueoUsuario").style.display = "none";
        document.getElementById("unlockEnviar").style.display = "none";
        DAM.Inicio.validarLogin();
    }
    DAM.Inicio.validarLogin = function () {
        var usuario, password;

        usuario = document.getElementById("loginUsuario");
        usuario.addEventListener("keyup",  DAM.Inicio.validarLoginUsuario, false);

        password = document.getElementById("loginPassword");
        password.addEventListener("keyup",   DAM.Inicio.validarLoginPassword, false);
        
    }
    DAM.Inicio.validarLoginUsuario = function(){
        parametro.nodo = this.id;
        parametro.valorMinimo = 5;
        parametro.valorMaximo = 30;
        validar.email(parametro);
       DAM.Inicio.validarBotonEnvio();
    };
    DAM.Inicio.validarLoginPassword = function(){
        parametro.nodo = this.id;
        validar.password(parametro);
        DAM.Inicio.validarBotonEnvio();
    };
    DAM.Inicio.validarBotonEnvio = function(){
        var botonEnviar;
        if(  document.getElementById("loginUsuario").style.background ==  VALIDO_COLOR &&
            document.getElementById("loginPassword").style.background ==  VALIDO_COLOR){

            botonEnviar = document.getElementById("loginEnviar");
            botonEnviar.style.display="";
            if  (document.getElementById("control").value == "login") botonEnviar.addEventListener("click", DAM.Inicio.enviarLogin);
            if  (document.getElementById("control").value == "register") botonEnviar.addEventListener("click", DAM.Inicio.enviarAlta);
        }
    };
    DAM.Inicio.enviarLogin = function(){
        var envio = {
            "loginUsuario" : document.getElementById("loginUsuario").value,
            "loginPassword" : document.getElementById("loginPassword").value
        };
        var json = JSON.stringify(envio);
        llamada = new ajax.CargadorContenidos("/IdentificarLoginUsuario",DAM.Inicio.verificarLogin ,json);
};
    DAM.Inicio.verificarLogin = function() {
        if (llamada.req.responseText == "ok") {
            sessionStorage.setItem('yo', document.getElementById("loginUsuario").value);
            location.reload();
        }
        else {
            document.getElementById("loginEnviar").style.display = "";
            document.getElementById("loginError").style.display = "";
            document.getElementById("loginError").innerHTML = llamada.req.responseText;

            if (llamada.req.responseText.indexOf("loquead@") > 0) {
                if(llamada.req.responseText.indexOf("desbloquead@") > 0){

                }
                else{
                    document.getElementById("avisoEnviar").style.display = "";
                    document.getElementById("avisoEnviar").addEventListener("click", DAM.Inicio.aviso);
                }
            }
        }
    };

    DAM.Inicio.aviso = function(){
        var envio = {
            "loginUsuario" : document.getElementById("loginUsuario").value,
            "loginPassword" : document.getElementById("loginPassword").value
        };
        var json = JSON.stringify(envio);

        llamada = new ajax.CargadorContenidos("/Mail", DAM.Inicio.emailEnviado,json);

    };
    DAM.Inicio.emailEnviado = function(){

        if (llamada.req.responseText == "go") {
            document.getElementById("clavebloqueoUsuario").style.display = "";
            document.getElementById("unlockEnviar").style.display = "";
            document.getElementById("unlockEnviar").addEventListener("click", DAM.Inicio.desbloquear);
        }
        else {
            document.getElementById("loginError").innerHTML = "Problemas con MAIL";
        }
    }
    DAM.Inicio.desbloquear = function(){

            var envio = {
                "loginUsuario" : document.getElementById("loginUsuario").value,
                "loginPassword" : document.getElementById("loginPassword").value,
                "claveBloqueo": document.getElementById("clavebloqueoUsuario").value
            };
            var json = JSON.stringify(envio);

            llamada = new ajax.CargadorContenidos("/checkBloqueo", DAM.Inicio.checkBloqueo, json);


    };
    DAM.Inicio.checkBloqueo = function(){

        if (llamada.req.responseText == "claveBloqueoOk") {
            sessionStorage.setItem('yo', document.getElementById("loginUsuario").value);
            location.reload();
        }
        else {
            document.getElementById("loginError").innerHTML = "Problemas con CLAVE BLOQUEO";
        }

    }

    ////////////// ALTA/////////////////////////

    DAM.Inicio.altausuario = function(){

        event.preventDefault();
        document.getElementById("cuerpoInicio").innerHTML = P_altausuario();
        document.getElementById("loginError").style.display = "none";
        document.getElementById("loginEnviar").style.display = "none";
        DAM.Inicio.validarLogin();
    };

    DAM.Inicio.enviarAlta = function(){

       var envio = {
            "loginUsuario" : document.getElementById("loginUsuario").value,
            "loginPassword" : document.getElementById("loginPassword").value
        };
        var json = JSON.stringify(envio);
        llamada = new ajax.CargadorContenidos("/IdentificarAltaUsuario",DAM.Inicio.verificarAltaLogin,json);

    };

    DAM.Inicio.verificarAltaLogin = function(){

        if (llamada.req.responseText == "ok") {
            sessionStorage.setItem('yo', document.getElementById("loginUsuario").value);
            location.reload();
        }

        document.getElementById("loginError").style.display = "";
        document.getElementById("loginError").innerHTML = llamada.req.responseText;
    }


    DAM.Inicio.capturarEventos();
}) (window);
