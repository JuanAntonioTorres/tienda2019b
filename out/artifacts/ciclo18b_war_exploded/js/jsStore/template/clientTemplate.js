STORE.namespace('STORE.clientTemplate');
STORE.namespace('STORE.clientTemplate.insertTemplate');
STORE.clientTemplate.insertTemplate = "<input type='hidden' value='unoAuno' id='estrategia'>\n" +
    "\n" +
    "<div class='contenido01'>\n" +
    "    <form id='client_register'>\n" +
    "        <div class='menu s3 caja03'>\n" +
    "            <h4>New Client</h4>\n" +
    "\n" +
    "            <div id='div_dniCliente'>\n" +
    "                <label for='dniCliente'>dni:</label>\n" +
    "                <input class='etiqueta s8' id='dniCliente' name = 'nif' type='text' data-functioncallback='ValidacionExpresionRegular.validarDniNieCif' required placeholder='input your dni' title='dni'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_clientFirstName'>\n" +
    "                <label class='labelInput' for='clientFirstName'>Nombre:</label>\n" +
    "                <input class='etiqueta s8' id='clientFirstName' name ='firstName' type='text' data-functioncallback='ValidacionExpresionRegular.validarLetrasConEspacio' size='24' minlength='3' maxlength='80' required placeholder='input your FirstName' title='3 to 50 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_clientLastName'>\n" +
    "                <label class='labelInput' for='clientLastName'>Apellidos:</label>\n" +
    "                <input class='etiqueta s8' id='clientLastName' name='lastName' type='text' data-functioncallback='ValidacionExpresionRegular.validarLetrasConEspacio' minlength='5' maxlength='100' required placeholder='input your LastName' title='3 to 70 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_clientCP'>\n" +
    "                <label class='labelInput' for='clientCP'>C P:</label>\n" +
    "                <input class='etiqueta s8' id='clientCP' name='postalCode' type='text' data-functioncallback='ValidacionExpresionRegular.validarCodigoPostal' required placeholder='input your cp' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_DomicilioCliente'>\n" +
    "                <label class='labelInput' for='DomicilioCliente'>Domicilio:</label>\n" +
    "                <input class='etiqueta s8' id='DomicilioCliente' name='address' type='text' data-functioncallback='ValidacionExpresionRegular.validarDomicilio' minlength='2' maxlength='100' required placeholder='Adress' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_FechaNacimiento'>\n" +
    "                <label class='labelInput' for='FechaNacimiento'>Fecha Nacimiento:</label>\n" +
    "                <input class='etiqueta s8' id='FechaNacimiento' name='birthDate' type='date' data-functioncallback='ValidacionExpresionRegular.validarFecha'  required placeholder='Adress' title='5 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_TelefonoFijo'>\n" +
    "                <label for='TelefonoFijo'>tlf. fijo:</label>\n" +
    "                <select id='prefijoFijo'></select>\n" +
    "                <input class='etiqueta s8' id='TelefonoFijo' name='phone' type='tel' data-functioncallback='ValidacionExpresionRegular.validarTelefonoFijo' size='20' required placeholder='Tlf Fijo' title='Tlf Fijo'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_clientSexo'>\n" +
    "                <label class='labelInput' for='clientSexo'>Sexo:</label>\n" +
    "                <select class='etiqueta s8 file' id='clientSexo' name='sex' data-functioncallback='ValidarListaValores.validarSexo'>\n" +
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
    "            <div id='div_clientUsuario'>\n" +
    "                <label class='labelInput' for='clientUsuario'>Usuario:</label>\n" +
    "                <input class='etiqueta s8' id='clientUsuario' name ='userName' type='text' data-functioncallback='ValidacionExpresionRegular.validarUsuario' size='24' minlength='7' maxlength='7' required placeholder='input your User' title='3 to 50 characters'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id='div_userPassword'>\n" +
    "                <label for='userPassword'>Password:</label>\n" +
    "                <input class='etiqueta s8' id='userPassword' name ='userPassword' type='userPasword' placeholder='Contraseña' data-functioncallback='ValidacionExpresionRegular.validarPassword'>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class='fileinputs etiqueta s8' id='div_clientImage'>\n" +
    "                <input class='etiqueta s8 file' id='clientImage' type='file' name='image' data-functioncallback='ValidarFicheroName.validarImagenName' required accept='image/png, image/jpeg' placeholder='input your Avatar' title='3 to 120 characters'>\n" +
    "                <div class='fakefile'>\n" +
    "                    <label class='labelInput' for='idFile'>Elije tu foto</label>\n" +
    "                    <input id='idFile' name='myFile'>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class='etiqueta errorColor' id='alertaError'>Error:</div>\n" +
    "            <button id='submit' type='submit'>Enviar</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>";

STORE.namespace('STORE.clientTemplate.loginTemplate');
STORE.clientTemplate.loginTemplate = "<div class='contenido01'>\n" +
        "    <form id='client_register'>\n" +
        "\n" +
        "        <input type='hidden' value = '<%=opcion%>' name = 'opcion'>\n" +
        "\n" +
        "        <div class='menu s3 caja03'>\n" +
        "            <h4><%=operacion%> Session</h4>\n" +
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
        "            <button id='submit' type='submit'>Enviar</button>\n" +
        "        </div>\n" +
        "    </form>\n" +
        "</div>";