/**
 * Created by Luciano on 30/01/2018.
 */
DAM.namespace('DAM.Profesor');
(function(g){
    'use strict';
    var ajax = DAM.Ajax;
    var llamada;
    var envio;

    DAM.Profesor.capturarEventos = function(){

        sessionStorage.setItem('perfil', 'DAM.Profesor');
        // headerInicio
        document.getElementById("imagen1").innerHTML = P_dadoHarnina();
        document.getElementById("menuInicio").innerHTML = P_menuProfesor() +  P_misDatosOpcion() + P_salir() + P_menuProfesor_fin();
        document.getElementById("imagen2").innerHTML = P_dadoInformatica();
        // mainInicio
        document.getElementById("cuerpoInicio").innerHTML = P_bienvenidaProfesor();
        document.getElementById("usuario").innerHTML =  sessionStorage.getItem("yo");
        //pieInicio
       // document.getElementById("pieInicio").innerHTML = P_pieInicio();
        //....... E v e n t o s ............... ----->
        document.getElementById("bienvenidaProfesor").addEventListener("click", DAM.Profesor.bienvenidaProfesor);
        document.getElementById("alumnos1").addEventListener("click", DAM.Profesor.AlumnosCurso1);
        document.getElementById("alumnos2").addEventListener("click", DAM.Profesor.AlumnosCurso2);
        DAM.Persona.misDatosEvent(); // En lugar de crear Nodo
        DAM.Salir.salirEvent();  // En lugar de crear Nodo

    };

    DAM.Profesor.bienvenidaProfesor = function() {
        event.preventDefault();
        document.getElementById("cuerpoInicio").innerHTML = P_bienvenidaProfesor();
        document.getElementById("usuario").innerHTML =  sessionStorage.getItem("yo");
    };
        // LISTA DE ALUMNOS
    DAM.Profesor.AlumnosCurso1 = function(){

        DAM.Profesor.AlumnosLista(1);
    };
    DAM.Profesor.AlumnosCurso2 = function(){
         DAM.Profesor.AlumnosLista(2);
    };
    DAM.Profesor.AlumnosLista = function(micurso) {
        event.preventDefault();

        var envio = {
             "curso" : micurso
        };
        var json = JSON.stringify(envio);
        llamada = new ajax.CargadorContenidos("/MisAlumnos", DAM.Profesor.listaAlumnos,json);
    };
    DAM.Profesor.listaAlumnos = function(){

        var lista = JSON.parse(llamada.req.responseText);
        var contendorLista =   "<nav class='menuUno'>" +
            "<div class='opcionUno'>Lista Alumnos 1</div>";

        for (var i = 0; i < lista.length; i++) {
            contendorLista = contendorLista + "<div class='opcionUno'>" + lista[i] +"</div>";
        }

        document.getElementById("cuerpoInicio").innerHTML =  contendorLista;
    };

    DAM.Profesor.capturarEventos();
}) (window);
