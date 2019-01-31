package validators;

import error.Error;

public class DateValidator extends ValidacionRegularExpression implements Validator {

    private static final String patron = "^(\\d{4})(\\-)(0[1-9]|1[012])(\\-)(0[1-9]|[1-2]\\d|3[01])$";

    private String value;

    public DateValidator(String value) {
        this.value = value;
    }

    @Override
    public Error validate() {
        if (super.validar(value, patron)) {
            return null;
        }

        return Error.ERROR_FECHA_BAD;
    }


}

