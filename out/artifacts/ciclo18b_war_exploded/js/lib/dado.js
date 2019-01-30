var dado = ["dado informatica","dado harnina","dado juntaextremadura"];
var image = ["img/escudo02.png","img/harni01.png","img/Escudo_de_Extremadura.png"]; 
var clase = ["cara frontal","cara trasera","cara derecha","cara izquierda","cara arriba","cara abajo"];

var creaImagen = function(imag){
    var  imagen = document.createElement("img");
    imagen.setAttribute("src", imag);
    imagen.className = "Imagen";  
    return imagen;    
}

var creaCara = function(dado,n,imagen){
    for (var i=0;i < clase.length;i++){ 
         window['cara'+ i] = document.createElement("div"); 
         window['cara'+ i].className = clase[i];
         window['cara'+ i].appendChild(creaImagen(imagen));
         dado[n].appendChild(window['cara'+ i]);        
    }
} 

for (var i = 0; i<= dado.length; i++)
        {
          window['dado'+ i] = document.getElementsByClassName(dado[i]);  
            for (var j=0;j < window['dado'+ i].length;j++){
                        creaCara( window['dado'+ i],j,image[i]);
                }   
        }
