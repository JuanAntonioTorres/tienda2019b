/**
 * Created by Luciano on 14/03/2018.
 */


DAM.namespace('DAM.Salir');
(function(g){
    var ajax = DAM.Ajax;
    var llamada;

            // S A L I R
    DAM.Salir.Salir = function(){
                event.preventDefault();
                llamada = new ajax.CargadorContenidos("/Salir", DAM.Salir.Salido);
            };
    DAM.Salir.Salido = function(){
                location.reload();
            };
    DAM.Salir.salirEvent = function(){
        document.getElementById("salir").addEventListener("click",  DAM.Salir.Salir);
    }
}) (window);