/**
 * Created by Luciano on 30/01/2018.
 */
var P_bienvenidaProfesor = function(){
    var plantilla = "<div>" +
        "<h2>Bienvenid@...... <span  id='usuario'> .....</span></h2>" +
        "<p>al ciclo formativo de grado superior de Desarrollo de Aplicaciones Multiplataforma impartido en"+
        "I.E.S Arroyo Harnina de Almendralejo. El ciclo más duro de DAM de toda Extremadura, donde el ritmo de las" +
        "clases es tan rápido que si miras el movil 30 segundos ¡estás fuera!." +
        "En primer curso los alumnos estan un poco despistados, se creen que van a jugar todo el día. " +
        "y no se creen que el tiempo es para estudiar." +
        " En segundo aunque son más consciente que deben de estudiar, se agobian un montón." +
        " debido al nivel tan alto de enseñanza." +
        "Así si eres nuevo y quieres que tus alumnos aprendan o estudias mucho o ya puedes decir SAYONARA BABY!!"+
        "</p>" +
        "</div>";
    return plantilla;
}
var P_dadoInformatica = function(){
    var plantilla = "<div class='dadoUno'>" +
        "<div class='cara frontal'><img src='img/escudo02.png' class='imagenUnoImagen'></div>" +
        "<div class='cara trasera'><img src='img/escudo02.png' class='imagenUnoImagen'></div>" +
        "<div class='cara derecha'><img src='img/escudo02.png' class='imagenUnoImagen'></div>" +
        "<div class='cara izquierda'><img src='img/escudo02.png' class='imagenUnoImagen'></div>" +
        "<div class='cara arriba'><img src='img/escudo02.png' class='imagenUnoImagen'></div>" +
        "<div class='cara abajo'><img src='img/escudo02.png' class='imagenUnoImagen'></div>" +
        "</div>";
    return plantilla;
}
var P_dadoHarnina = function(){

    var plantilla = "<div class='dadoDos'>" +
        "<div class='cara frontal'><img src='img/harni01.png' class='imagenUnoImagen'></div>" +
        "<div class='cara trasera'><img src='img/harni01.png' class='imagenUnoImagen'></div>" +
        "<div class='cara derecha'><img src='img/harni01.png' class='imagenUnoImagen'></div>" +
        "<div class='cara izquierda'><img src='img/harni01.png' class='imagenUnoImagen'></div>" +
        "<div class='cara arriba'><img src='img/harni01.png' class='imagenUnoImagen'></div>" +
        "<div class='cara abajo'><img src='img/harni01.png' class='imagenUnoImagen'></div>" +
        "</div>";
    return plantilla;
}
var P_menuProfesor = function(){
    var plantilla = "<div class='dadoTres'>" +
        "<div class='caraTres frontalTres'><div class='icon-menu'></div></div>" +
        "<div class='caraTres traseraTres'>" +
        "<nav class='menuUno'>" +
        "<div class='opcionUno' id='bienvenidaProfesor'>Bienvenido</div>" +
        "<div class='opcionUno' id='alumnos1'>1º Curso</div>" +
        "<div class='opcionUno' id='alumnos2'>2º Curso</div>" ;


    return plantilla;
};

var P_menuProfesor_fin = function(){
    var plantilla = "</nav>" +
    "</div>" +
    "<div class='caraTres izquierdaTres'></div>" +
    "</div>";
    return plantilla;
};