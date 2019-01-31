package error;


public enum Error {

    ERROR_MISSING(25,"Error Desconocido","","ErrorMissing"),
    ERROR_NOPATTERN(50,"No cumple el patrón","","NoPattern"),
    ERROR_NOTIN(70,"El valor no está en la lista","","NotIn"),
    ERROR_CODIGOPOSTAL_INCORRECTO (100,"Codigo Postal Incorrecto","","CodigoPostalIncorrecto"),
    ERROR_CODIGOPOSTAL_INEXISTENTE(101,"Codigo Postal Inexistente","","CodigoPostalInexistente"),
    ERROR_NIF_LENGTH(110,"Cadena distinta a 9 caracteres y/o  el último caracter no es una letra","","NifIncorrecto"),
    ERROR_NIF_8DIGIT_LETTER(112,"8 dígitos entre los 8 primeros caracteres y una letra al final que corresponda para esos digitos","","NifIncorrecto"),
    ERROR_NIE_BAD(114,"NIE Incorrecto","","NieIncorrecto"),
    ERROR_CIF_BAD(116,"CIF Incorrecto","","CifIncorrecto"),
    ERROR_EMAIL_BAD (120,"El email introducido es incorrecto.","","EmailIncorrecto"),
    ERROR_EXTENSION_BAD (130,"Extension No válida","","ExtensionInvalida"),
    ERROR_FECHA_BAD (140,"La fecha especificada no es correcta.","","FechaInvalida"),
    ERROR_LETTER_SPACE(150,"Solo puede contener letras y espacio","","LetraSpace"),
    ERROR_LETTER_ONLY(160,"Solo puede contener letras","","LetraNoSpace"),
    ERROR_INTERVALO(170,"Intervalo Incorrecto ","","IntervalBad"),
    ERROR_PASSWORD_BAD(180, "Revise la contraseña, por favor.", "Lorem Ipsum...", "Passwordbad"),
    ERROR_PHONE_BAD(190, "El teléfono es incorrecto.", "Lorem Ipsum...", "PhoneBad"),
    ERROR_USUARIO_BAD(200, "Revise el usuario, por favor.", "Lorem Ipsum...","UsuarioBad"),
    ERROR_DOMICILIO_BAD(210,"El domicilio contiene caracteres no permitidos","","DomicilioBad"),
    ERROR_DOCUMENT_BAD(220,"Documento Incorrecto" ,"","DocumentBad");


    private final int id;
    private final String message;
    private final String description;
    private final String className;

    Error(int id, String message, String description, String className) {
        this.id = id;
        this.message = message;
        this.description = description;
        this.className = className;
    }

    public int getId() {
        return this.id;
    }

    public String getMessage() {
        return this.message;
    }

    public String getDescription() {
        return this.description;
    }

    public String getClassName() {
        return this.className;
    }
}


