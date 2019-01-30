/**
 * Created by Luciano on 13/01/2018.
 */


var P_bienvenidaInicio = function(){
    var plantilla = "<div>" +
                        "<h2>Bienvenido <span  id='usuario'> .....</span></h2>" +
                        "<p>al ciclo formativo de grado superior de Desarrollo de Aplicaciones Multiplataforma impartido en"+
                            "I.E.S Arroyo Harnina de Almendralejo. El ciclo más duro de DAM de toda Extremadura, donde el ritmo de las" +
                            "clases es tan rápido que si miras el movil 30 segundos ¡estás fuera!." +
                            "En primer curso estamos matriculados unos 30 alumnos de los cuales más de la mitad son repetidores, " +
                             "y sólo tienen que cursar la mitad de los módulos." +
                            "De estos 30 alumnos pasarían a segundo curso aproximadamente unos 10, la mayoría repetidores de años anteriores," +
                            "si vienes nuevo y no tienes conocimientos previos de programación ya puedes decir SAYONARA BABY!!"+
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
var P_menuInicio = function(){
    var plantilla = "<div class='dadoTres'>" +
                          "<div class='caraTres frontalTres'><div class='icon-menu'></div></div>" +
                               "<div class='caraTres traseraTres'>" +
                                    "<nav class='menuUno'>" +
                                        "<div class='opcionUno' id='bienvenidaInicio'>Bienvenido</div>" +
                                        "<div class='opcionUno'>Secretaria</div>" +
                                        "<div class='opcionUno' id='altausuario'>Alta</div>" +
                                        "<div class='opcionUno' id='login'>Login</div>" +
                                    "</nav>" +
                               "</div>" +
                          "<div class='caraTres izquierdaTres'></div>" +
                     "</div>";
    return plantilla;
}
var P_login = function(){
    var plantilla = "<div class='panel02'>" +
                            email_password("Login") +
                           "<input type='button' value='Enviar Email' class='panel02Boton' id='avisoEnviar'>" +
                           "<input type='text' placeholder='Clave de bloqueo' id='clavebloqueoUsuario'>" +
                           "<input type='button' value='Desbloquear' class='panel02Boton' id='unlockEnviar'>" +
                           "<input name='control' id='control' type='hidden' value='login' />" +

                     "</div>" ;
    return plantilla;
}
var P_altausuario = function(){
    var plantilla = "<div class='panel02'>" +
                             email_password("Register") +
                             "<input name='control' id='control' type='hidden' value='register' />" +
                     "</div>";
    return plantilla;
}
var P_pieInicio = function() {
    var plantilla = "<nav class='navFooter'>" +
                        "<div class='panelFooter'>" +
                            "<div class='frontalFooter'>" +
                                 "<div class='icon-pencil'></div>" +
                            "</div>" +
                            "<div class='traseraFooter'>FIRMAR</div>" +
                        "</div>" +
                        "<div class='panelFooter'>" +
                            "<div class='frontalFooter'>" +
                                "<div class='icon-file-text2'></div>" +
                            "</div>" +
                            "<div class='traseraFooter'>SUGERENCIA</div>" +
                        "</div>" +
                        "<div class='panelFooter'>" +
                              "<div class='frontalFooter'>" +
                                    "<div class='icon-exit'></div>" +
                              "</div>" +
                              "<div class='traseraFooter'>SALIR</div>" +
                        "</div>" +
                    "</nav>";
    return plantilla;
}

var email_password = function(operacion){
    var plantilla =
        "<h1 class='panel02Cabecera'>"+ operacion + "</h1>" +
        "<input type='text' placeholder='email' id='loginUsuario'>"+
        "<input type='password' placeholder='password' id='loginPassword'>" +
        "<h3  class='panel02Error' id='loginError'></h3> " +
        "<input type='button' value='Enviar' class='panel02Boton' id='loginEnviar'>" ;
    return plantilla;
}
