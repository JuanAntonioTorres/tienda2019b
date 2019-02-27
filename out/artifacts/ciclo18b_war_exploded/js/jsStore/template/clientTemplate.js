STORE.namespace('STORE.clientTemplate');
STORE.namespace('STORE.clientTemplate.insertTemplate');
STORE.clientTemplate.insertTemplate = "<input type='hidden' id='estrategia'>\n" +
    "\n" +
    "<div class='contenido01'>\n" +
    "    <div id='client_register'>\n" +
    "        <div class='menu s3 caja03'>\n" +
    "            <h4>New Client</h4>\n" +
    "\n" +
    "            <div id='div_nif'>\n" +
    "                <label for='nif'>dni:</label>\n" +
    "                <input class='etiqueta s8' id='nif' name = 'nif' type='text' data-functioncallback='ValidacionExpresionRegular.validarDniNieCif' required placeholder='input your dni' title='dni'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_firstName'>\n" +
    "                <label class='labelInput' for='firstName'>Nombre:</label>\n" +
    "                <input class='etiqueta s8' id='firstName' name ='firstName' type='text' data-functioncallback='ValidacionExpresionRegular.validarLetrasConEspacio' size='24' minlength='3' maxlength='80' required placeholder='input your FirstName' title='3 to 50 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_lastName'>\n" +
    "                <label class='labelInput' for='lastName'>Apellidos:</label>\n" +
    "                <input class='etiqueta s8' id='lastName' name='lastName' type='text' data-functioncallback='ValidacionExpresionRegular.validarLetrasConEspacio' minlength='5' maxlength='100' required placeholder='input your LastName' title='3 to 70 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_postalCode'>\n" +
    "                <label class='labelInput' for='postalCode'>C P:</label>\n" +
    "                <input class='etiqueta s8' id='postalCode' name='postalCode' type='text' data-functioncallback='ValidacionExpresionRegular.validarCodigoPostal' required placeholder='input your cp' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_address'>\n" +
    "                <label class='labelInput' for='address'>Domicilio:</label>\n" +
    "                <input class='etiqueta s8' id='address' name='address' type='text' data-functioncallback='ValidacionExpresionRegular.validarDomicilio' minlength='2' maxlength='100' required placeholder='Adress' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_birthDate'>\n" +
    "                <label class='labelInput' for='birthDate'>Fecha Nacimiento:</label>\n" +
    "                <input class='etiqueta s8' id='birthDate' name='birthDate' type='date' data-functioncallback='ValidacionExpresionRegular.validarFecha'  required placeholder='Adress' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_phone'>\n" +
    "                <label for='phone'>tlf. fijo:</label>\n" +
    "                <input class='etiqueta s8' id='phone' name='phone' type='tel' data-functioncallback='ValidacionExpresionRegular.validarTelefonoFijo' size='20' required placeholder='Tlf Fijo' title='Tlf Fijo'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_mobile'>\n" +
    "                <label for='mobile'></label>\n" +
    "                <select id='prefijo'></select>\n" +
    "                <input class='etiqueta s8' id='mobile' name='mobile' value='' type='tel' data-functioncallback='ValidacionExpresionRegular.validarTelefonoFijo' size='20' required placeholder='Tlf Movil' title='Tlf Movil'>\n" + /*"ValidacionExpresionRegular.validarNumeroMovil"*/
    "            </div>\n" +
    "\n" +
    "            <div id='div_sex'>\n" +
    "                <label class='labelInput' for='sex'>Sexo:</label>\n" +
    "                <select class='etiqueta s8 file' id='sex' name='sex' data-functioncallback='ValidarListaValores.validarSexo'>\n" +
    "                    <option value=''>-- Select Sexo --</option>\n" +
    "                    <option value='m'>Hombre</option>\n" +
    "                    <option value='f'>Mujer</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_email'>\n" +
    "                <label for='email'>Email:</label>\n" +
    "                <input class='etiqueta s8' id='email' name='email' type='email' data-functioncallback='ValidacionExpresionRegular.validarEmail' required placeholder='input your Email' title='Email'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_userName'>\n" +
    "                <label class='labelInput' for='userName'>Usuario:</label>\n" +
    "                <input class='etiqueta s8' id='userName' name ='userName' type='text' data-functioncallback='ValidacionExpresionRegular.validarUsuario' size='24' minlength='7' maxlength='7' required placeholder='input your User' title='3 to 50 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_userPassword'>\n" +
    "                <label for='userPassword'>Password:</label>\n" +
    "                <input class='etiqueta s8' id='userPassword' name ='userPassword' type='userPasword' placeholder='Contraseña' data-functioncallback='ValidacionExpresionRegular.validarPassword'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class='fileinputs etiqueta s8' id='div_image'>\n" +
    "                <input class='etiqueta s8 file' id='image' type='file' name='image' data-functioncallback='ValidarFicheroName.validarImagenName' required accept='image/png, image/jpeg' placeholder='input your Avatar' title='3 to 120 characters'>\n" +
    "                <div class='fakefile'>\n" +
    "                    <label class='labelInput' for='idFile'>Elije tu foto</label>\n" +
    "                    <input id='idFile' name='myFile'>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class='etiqueta errorColor' id='alertaError'>Error:</div>\n" +
    "            <button id='submit'>Enviar</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div></div>";

STORE.namespace('STORE.clientTemplate.loginTemplate');
STORE.clientTemplate.loginTemplate = "<div class='contenido01'>\n" +
    "    <div id='client_register'>\n" +
    "\n" +
    "        <input type='hidden' name = 'opcion'>\n" +
    "\n" +
    "        <div class='menu s3 caja03'>\n" +
    "            <h4>Session</h4>\n" +
    "\n" +
    "            <div id='div_userName'>\n" +
    "                <label class='labelInput' for='userName'>Usuario:</label>\n" +
    "                <input class='etiqueta s8' id='userName' name ='userName'  type='text' data-functioncallback='ValidacionExpresionRegular.validarUsuario' size='24' minlength='7' maxlength='7' required placeholder='input your User' title='3 to 50 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_userPassword'>\n" +
    "                <label for='userPassword'>Password:</label>\n" +
    "                <input class='etiqueta s8' id='userPassword' name ='userPassword' type='userPassword' placeholder='Contraseña' data-functioncallback='ValidacionExpresionRegular.validarPassword'>\n" +
    "            </div>\n" +
    "            <div class='etiqueta errorColor' id='alertaError'>Error:</div>\n" +
    "            <button id='submit'>Enviar</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div></div>";
STORE.namespace('STORE.clientTemplate.loginTemplate');
STORE.clientTemplate.formSessionLocked = "<div class='contenido01'>" +
    "<div class='menu s3 caja03'>" +
    "<div class='etiqueta errorColor' id='alertaError'>Error:</div>" +
    "<button id='locked'>Locked</button>" +
    "</div>" +
    "</div>";
STORE.namespace('STORE.clientTemplate.updateLoginClient');
STORE.clientTemplate.updateLoginClient="<div class=\"contenido01\">\n" +
    "    <div id=\"client_register\">\n" +
    "\n" +
    "        <div class=\"menu s3 caja03\">\n" +
    "            <h4>Update Login</h4>\n" +
    "\n" +
    "            <div id=\"div_userName\">\n" +
    "                <label class=\"labelInput\" for=\"userName\">Usuario:</label>\n" +
    "                <input class=\"etiqueta s8\" id=\"userName\" name =\"userName\"  type=\"text\" data-functioncallback=\"ValidacionExpresionRegular.validarUsuario\" size=\"24\" minlength=\"7\" maxlength=\"7\" required placeholder=\"input your User\" title=\"3 to 50 characters\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div id=\"div_userPassword\">\n" +
    "                <label for=\"userPassword\">Password:</label>\n" +
    "                <input class=\"etiqueta s8\" id=\"userPassword\" name =\"userPassword\"  type=\"userPassword\" placeholder=\"Contraseña\" data-functioncallback=\"ValidacionExpresionRegular.validarPassword\">\n" +
    "            </div>\n" +
    "            <div class=\"etiqueta errorColor\" id=\"alertaError\">Error:</div>\n" +
    "            <button id=\"submit\">Enviar</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>";

STORE.namespace('STORE.clientTemplate.updateDaperClient');
STORE.clientTemplate.updateDaperClient="<input type='hidden' value='unoAuno' id='estrategia'>\n" +
    "\n" +
    "<div class='contenido01'>\n" +
    "    <div id='client_register'>\n" +
    "        <div class='menu s3 caja03'>\n" +
    "            <h4>Update Client</h4>\n" +
    "            <div id='div_firstName'>\n" +
    "                <label class='labelInput' for='firstName'>Nombre:</label>\n" +
    "                <input class='etiqueta s8' id='firstName' name ='firstName' type='text' data-functioncallback='ValidacionExpresionRegular.validarLetrasConEspacio' size='24' minlength='3' maxlength='80' required placeholder='input your FirstName' title='3 to 50 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_lastName'>\n" +
    "                <label class='labelInput' for='lastName'>Apellidos:</label>\n" +
    "                <input class='etiqueta s8' id='lastName' name='lastName' type='text' data-functioncallback='ValidacionExpresionRegular.validarLetrasConEspacio' minlength='5' maxlength='100' required placeholder='input your LastName' title='3 to 70 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_postalCode'>\n" +
    "                <label class='labelInput' for='postalCode'>C P:</label>\n" +
    "                <input class='etiqueta s8' id='postalCode' name='postalCode' type='text' data-functioncallback='ValidacionExpresionRegular.validarCodigoPostal' required placeholder='input your cp' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_address'>\n" +
    "                <label class='labelInput' for='address'>Domicilio:</label>\n" +
    "                <input class='etiqueta s8' id='address' name='address' type='text' data-functioncallback='ValidacionExpresionRegular.validarDomicilio' minlength='2' maxlength='100' required placeholder='Adress' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_birthDate'>\n" +
    "                <label class='labelInput' for='birthDate'>Fecha Nacimiento:</label>\n" +
    "                <input class='etiqueta s8' id='birthDate' name='birthDate' type='date' data-functioncallback='ValidacionExpresionRegular.validarFecha'  required placeholder='Adress' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_phone'>\n" +
    "                <label for='phone'>tlf. fijo:</label>\n" +
    "                <select id='phone'></select>\n" +
    "                <input class='etiqueta s8' id='phone' name='phone' type='tel' data-functioncallback='ValidacionExpresionRegular.validarTelefonoFijo' size='20' required placeholder='Tlf Fijo' title='Tlf Fijo'>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div id='div_mobile'>\n" +
    "                <label for='mobile'></label>\n" +
    "                <select id='prefijo'></select>\n" +
    "                <input class='etiqueta s8' id='mobile' name='mobile' value='' type='tel' data-functioncallback='ValidacionExpresionRegular.validarTelefonoFijo' size='20' required placeholder='Tlf Movil' title='Tlf Movil'>\n" + /*"ValidacionExpresionRegular.validarNumeroMovil"*/
    "            </div>\n" +
    "\n" +
    "            <div id='div_sex'>\n" +
    "                <label class='labelInput' for='sex'>Sexo:</label>\n" +
    "                <select class='etiqueta s8 file' id='sex' name='sex' data-functioncallback='ValidarListaValores.validarSexo'>\n" +
    "                    <option value=''>-- Select Sexo --</option>\n" +
    "                    <option value='m'>Hombre</option>\n" +
    "                    <option value='f'>Mujer</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_email'>\n" +
    "                <label for='email'>Email:</label>\n" +
    "                <input class='etiqueta s8' id='email' name='email' type='email' data-functioncallback='ValidacionExpresionRegular.validarEmail' required placeholder='input your Email' title='Email'>\n" +
    "            </div>\n" +
    "            <div class='etiqueta errorColor' id='alertaError'>Error:</div>\n" +
    "            <button id='submit'>Enviar</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>";

STORE.namespace('STORE.clientTemplate.updateAvatarClient');
STORE.clientTemplate.updateAvatarClient="<div class=\"contenido01\">\n" +
"    <img src= \"../img/fotoClient/" + sessionStorage.getItem("nif") + ".png?" + Math.random() +" alt=\"\" height=\"200px\" width=\"300px\">\n" +
"    <form enctype=\"multipart/form-data\" id=\"client_register\" method=\"POST\" action=\"/UpCliAvaCon\">\n" +
"        <div class=\"menu s3 caja03\">\n" +
"            <h4>New Image</h4>\n" +
"            <div class=\"fileinputs etiqueta s2\" id=\"div_clientImage\">\n" +
"                <input class=\"etiqueta s5 file\" id=\"clientImage\" type=\"file\" name=\"image\" data-functioncallback=\"ValidarFicheroName.validarImagenName\" required accept=\"image/png, image/jpeg\" placeholder=\"input your Avatar\" title=\"3 to 120 characters\">\n" +
"                <div class=\"fakefile\">\n" +
"                    <label class=\"labelInput\" for=\"idFile\">Elije tu foto</label>\n" +
"                    <input id=\"idFile\" name=\"myFile\">\n" +
"                </div>\n" +
"            </div>\n" +
"            <div class=\"etiqueta errorColor\" id=\"alertaError\">Error:</div>\n" +
"            <button id=\"submit\" type=\"submit\">Enviar</button>\n" +
"        </div>\n" +
"    </form>\n" +
"</div>\n",

STORE.namespace('STORE.clientTemplate.delete');
STORE.clientTemplate.delete = "<div class='contenido01'>\n" +
    "    <div id='client_delete'>\n" +
    "\n" +
    "        <input type='hidden' name = 'opcion'>\n" +
    "\n" +
    "        <div class='menu s8 caja03'>\n" +
    "            <h4>Session</h4>\n" +
    "\n" +
    "            <div class='etiqueta errorColor' id='alertaError'>Error:</div>\n" +
    "            <button id='submit'>borrar</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div></div>";