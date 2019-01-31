package validators;

import error.Error;

public class ValidarDomicilio extends ValidacionRegularExpression implements Validator {

    private static final String patron = "^([0-9ºª.:,/a-zA-ZñÑáéíóúÜüÁÉÍÓÚ\\s]*)$";
    private String value;

    public ValidarDomicilio(String value) {
        this.value = value;
    }

    @Override
    public Error validate() {
        if (super.validar(value, patron)) {
            return null;
        }

        return Error.ERROR_DOMICILIO_BAD;
    }


}
