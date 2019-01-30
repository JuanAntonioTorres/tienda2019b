/**
 * Created by Luciano on 14/03/2018.
 */
var P_Persona = function(){
    var plantilla = "<div class='dadoTres'>" +
        "<div class='caraTres frontalTres'><div class='icon-menu'></div></div>" +
        "<div class='caraTres traseraTres'>" +
        "<nav class='menuUno'>" +
        "<div class='opcionUno' id='dlogin'>Login</div>" +
        "<div class='opcionUno' id='dglobales'>Globales</div>" +
        "<div class='opcionUno' id='dfoto'>foto</div>" +
        "<div class='opcionUno' id='dvolver'>Volver</div>" +
        "</nav>" +
        "</div>" +
        "<div class='caraTres izquierdaTres'></div>" +
        "</div>";
    return plantilla;
}
var P_misDatosOpcion = function(){

    var plantilla =  "<div class='opcionUno' id='misDatos'>Mis datos</div>"

    return plantilla;


}
var P_salir = function(){

    var plantilla =  "<div class='opcionUno' id='salir'>Salir</div>"

    return plantilla;


}
