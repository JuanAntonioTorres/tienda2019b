package validators;

import error.Error;

public class ValidacionTelefonoSpain extends ValidacionRegularExpression implements Validator {
    private static final String patron = "^(\\+34|0034|34)?[6789]\\d{8}$";//"^(\+34|0034|34)?[6789]\d{8}$";

    private static final String mensajeError = "Telefono Español Incorrecto";

    private String value;

    public ValidacionTelefonoSpain(String value) {

        this.value = value;

    }

    @Override
    public Error validate() {
        if (super.validar(value, patron)) {
            return null;
        }

        return Error.ERROR_PHONE_BAD;
    }


}
