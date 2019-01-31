package validators;

import error.Error;

public class VerificacionCodigoPostal implements Validator {

    private boolean valido;

    public VerificacionCodigoPostal(boolean valido) {
        this.valido = valido;
    }

    @Override
    public Error validate() {
        if (!valido) {
            return Error.ERROR_CODIGOPOSTAL_INCORRECTO;
        }

        return null;
    }
}
