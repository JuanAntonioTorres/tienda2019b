STORE.namespace('STORE.ProductTemplate');
STORE.ProductTemplate = {
    carrusel :"<contendorProductos>" +
        "   <div id='espacio'>" +
        "      <div id='giran' class= 'medio'>" +
        "            <span id='carro1' class='primera contenedorColumnaCarrusel opcionCarrusel'> <img id='primeraI' class='ImagenCarrusel' src='' ><div class='textoCarrusel' id='primera'></div><p hidden id='primeraH'></p></span>" +
        "            <span id='carro2' class='segunda contenedorColumnaCarrusel opcionCarrusel'> <img id='segundaI' class='ImagenCarrusel' src='' ><div class='textoCarrusel' id='segunda'></div><p hidden id='segundaH'></p></span>" +
        "            <span id='carro3' class='tercera contenedorColumnaCarrusel opcionCarrusel'> <img id='terceraI' class='ImagenCarrusel' src='' ><div class='textoCarrusel' id='tercera'></div><p hidden id='terceraH'></p></span>" +
        "            <span id='carro4' class='cuarta contenedorColumnaCarrusel opcionCarrusel'> <img id='cuartaI' class='ImagenCarrusel' src='' ><div class='textoCarrusel' id='cuarta'></div><p hidden id='cuartaH'></p></span>" +
        "            <span id='carro5' class='quinta contenedorColumnaCarrusel opcionCarrusel'> <img id='quintaI' class='ImagenCarrusel' src='' ><div class='textoCarrusel' id='quinta'></div><p hidden id='quintaH'></p></span>" +
        "            <span id='carro6' class='sexta contenedorColumnaCarrusel opcionCarrusel'> <img id='sextaI' class='ImagenCarrusel' src=''><div class='textoCarrusel' id='sexta'></div><p hidden id='sextaH'></p></span>  " +
        "       </div>" +
        "     </div>" +
        "  <div class='contenido01'> <span class='cuadrosDeTexto s17' id='carruselmenos'><</span> <spanclass='cuadrosDeTexto s17' id='carruselmas'>></span></div>" +
        "</contendorProductos>" +

        "<div id='productoDetalle'></div>" ,

    verProducto :
        "         <div class='contenido01'>" +
        "           <div class='menu s3 caja03'>" +
        "                <h4>Movil</h4>" +
        "                <p hidden id='IdModelo'></p>" +
        "                <div class='cuadrosDeTexto s17'> " +
        "                       <span>Modelo:</span>" +
        "                       <p id='nombreModelo'> </p> " +
        "                 </div>" +
        "                <div class='cuadrosDeTexto s17'> " +
        "                       <p id='descripcionModelo'> </p> " +
        "                 </div>" +
        "                <div class='cuadrosDeTexto s17'> " +
        "                       <span>Precio: </span>" +
        "                       <p id='actualPrecioModelo'> </p> " +
        "                 </div>" +
        "                <div class='cuadrosDeTexto s17'> " +
        "                       <span>Stock: </span>" +
        "                       <p id='stockActualModelo'> </p> " +
        "                 </div>" +
        "            <button id='comprar' >Comprar</button>" +
        "</div>" +
        "      </div>" +
        "           </div>"
}