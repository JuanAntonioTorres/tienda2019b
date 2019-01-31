package validators;

import error.Error;

public class ValidacionLetrasSinEspacio extends ValidacionRegularExpression implements Validator {

    private String patron = "^([a-zA-ZñÑáéíóúÁÉÍÓÚ\\S]*)$";
    private String value;

    public ValidacionLetrasSinEspacio(String value) {
        this.value = value;
    }

    @Override
    public Error validate() {
        if (super.validar(value, patron)) {
            return null;
        }

        return Error.ERROR_LETTER_ONLY;
    }


}