var panel = ["panel top","panel bottom","panel left","panel right"];
var clase = ["caraPanel frontalPanel","caraPanel traseraPanel","caraPanel izquierdaPanel"];


var creaCara = function(panel,n){
    for (var i=0;i < clase.length;i++){ 
         window['cara'+ i] = document.createElement("div");
			if(clase[i]=="caraPanel frontalPanel"){
				var icono = document.createElement("div");
				icono.className="icon-menu"
				window['cara'+ i].appendChild(icono);
			}
         window['cara'+ i].className = clase[i];
         panel[n].appendChild(window['cara'+ i]);        
    }
} 

	for (var i = 0; i<= panel.length; i++){
	  window['panel'+ i] = document.getElementsByClassName(panel[i]);  
		for (var j=0;j < window['panel'+ i].length;j++){
			creaCara( window['panel'+ i],j);
		}   
	}	