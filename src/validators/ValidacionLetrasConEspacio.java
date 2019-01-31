package validators;

import error.Error;

public class ValidacionLetrasConEspacio extends ValidacionRegularExpression implements Validator {

    private static final String patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]*)$";

    private String value;

    public ValidacionLetrasConEspacio(String value) {
        this.value = value;
    }

    @Override
    public Error validate(){

        if(super.validar(value,patron)){
            return null;
        }

        return Error.ERROR_LETTER_SPACE;
    }

}

