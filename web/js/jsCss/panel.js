
var panel = ["panel top","panel bottom","panel left","panel right"];
var clase = ["caraPanel traseraPanel","caraPanel frontalPanel","caraPanel izquierdaPanel"];
var altura = 0;
var translate =0;
var ancho = 0;
var creaCara = function(arrayDePaneles,tipoPanel,panelActual){
    for (var i=0;i < clase.length;i++){ 
         window['cara'+ i] = document.createElement("div");
			if(clase[i]=="caraPanel frontalPanel"){
				var icono = document.createElement("div");
				icono.className="icon-menu";
				window['cara'+ i].appendChild(icono);
			}
			
			if(clase[i]=="caraPanel traseraPanel"){
				if(panel[tipoPanel]== "panel top"){
					var menu = document.getElementsByClassName("menu");
					for(var j = 0;j < menu.length;j++){
						if(menu[j].parentNode==arrayDePaneles[panelActual]){
							
							menu[j].style.width = arrayDePaneles[panelActual].parentNode.offsetWidth+"px";
							
							if(menu[j].offsetHeight+"px") {
								altura=menu[j].offsetHeight+"px";
							}
							else if(menu[j].style.pixelHeight+"px"){
								altura=menu[j].style.pixelHeight+"px";
							}
							
							if( arrayDePaneles[panelActual].parentNode.offsetWidth+"px") {
								ancho= arrayDePaneles[panelActual].parentNode.offsetWidth+"px";
							}
							else if(arrayDePaneles[panelActual].parentNode.style.pixelWidth+"px"){
								ancho=arrayDePaneles[panelActual].parentNode.style.pixelWidth+"px";
							}
							
							window['cara'+ i].appendChild(menu[j]);
							
						}
					}	
				}
				if(panel[tipoPanel]== "panel left"){
					var menu = document.getElementsByClassName("menu");
					for(var j = 0;j < menu.length;j++){
						if(menu[j].parentNode==arrayDePaneles[panelActual]){
							
							menu[j].style.width = arrayDePaneles[panelActual].parentNode.offsetHeight+"px";
							
							if(menu[j].offsetHeight+"px") {
								altura=menu[j].offsetHeight+"px";
							}
							else if(menu[j].style.pixelHeight+"px"){
								altura=menu[j].style.pixelHeight+"px";
							}
							
							if( arrayDePaneles[panelActual].parentNode.offsetWidth+"px") {
								ancho= arrayDePaneles[panelActual].parentNode.offsetHeight+"px";
							}
							else if(arrayDePaneles[panelActual].parentNode.style.pixelWidth+"px"){
								ancho=arrayDePaneles[panelActual].parentNode.style.pixelHeight+"px";
							}
							
							window['cara'+ i].appendChild(menu[j]);
							
						}
					}	
				}
				var regex = /(\d+)/g;
				translate = ancho.match(regex);
				translate = (translate/10);
			}
		 
         window['cara'+ i].className = clase[i];
		 window['cara'+ i].style.height = altura;
		 
		 
		 if(clase[i]=="caraPanel traseraPanel"){
			 // Code for Chrome, Safari, Opera
			 window['cara'+ i].style.WebkitTransform = "rotateY(180deg) translateZ("+translate+"px)";
			 // Code for IE9
			 window['cara'+ i].style.msTransform = "rotateY(180deg) translateZ("+translate+"px)";
			 // Standard syntax
			 window['cara'+ i].style.transform = "rotateY(180deg) translateZ("+translate+"px)";
			 window['cara'+ i].style.width = ancho;
		 }
		 if(clase[i]=="caraPanel izquierdaPanel"){
			 // Code for Chrome, Safari, Opera
			 window['cara'+ i].style.WebkitTransform = "rotateY(-90deg) translateZ("+translate+"px)";
			 // Code for IE9
			 window['cara'+ i].style.msTransform = "rotateY(-90deg) translateZ("+translate+"px)";
			 // Standard syntax
			 window['cara'+ i].style.transform = "rotateY(-90deg) translateZ("+translate+"px)";
			 window['cara'+ i].style.width = translate*2+"px";
		 }
		 if(clase[i]=="caraPanel frontalPanel"){
			 // Code for Chrome, Safari, Opera
			 window['cara'+ i].style.WebkitTransform = "rotateY(0deg) translateZ("+translate+"px)";
			 // Code for IE9
			 window['cara'+ i].style.msTransform = "rotateY(0deg) translateZ("+translate+"px)";
			 // Standard syntax
			 window['cara'+ i].style.transform = "rotateY(0deg) translateZ("+translate+"px)";
			 window['cara'+ i].style.width = ancho;
		 }

         arrayDePaneles[panelActual].appendChild(window['cara'+ i]);  
		 arrayDePaneles[panelActual].style.height = altura;
		 arrayDePaneles[panelActual].style.width = ancho;
		 //  \d indica que quieres que coja números
		//   /g indica que quieres buscar de manera global en todo el string.
		if(panel[tipoPanel]=="panel top"){
			 var regex = /(\d+)/g;
			 var margen = altura.match(regex);
			 margen= margen-((margen*2)-30);
			 arrayDePaneles[panelActual].style.marginTop = margen+"px";
		}
		if(panel[tipoPanel]=="panel left"){
			 var regex = /(\d+)/g;
			 var margen = altura.match(regex);
			 margen= margen-((margen*2)-30);
			 arrayDePaneles[panelActual].style.marginLeft = margen+"px";

		} 		 
    }
	
} 

	for (var i = 0; i<= panel.length; i++){
	  window['panel'+ i] = document.getElementsByClassName(panel[i]); 
		for (var j=0;j < window['panel'+ i].length;j++){
			creaCara( window['panel'+ i],i,j);
			if(i>0){
				window['panel'+ i][j].style.height = ancho;
			}
			
			
			window['panel'+ i][j].setAttribute('tabindex', '0');
		}   
		
	}	
	window.onresize = function(){ location.reload(); }