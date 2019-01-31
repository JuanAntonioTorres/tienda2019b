package validators;

import error.Error;

public class PostalCodeValidator extends ValidacionRegularExpression implements Validator {

    private static final String patron ="^(?:0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3})$";

    private String value;

    public PostalCodeValidator(String value){

        this.value = value;

    }
    @Override
    public Error validate(){
        if(super.validar(value,patron)) {
            return null;
        }

        return Error.ERROR_CODIGOPOSTAL_INCORRECTO;
    }


}
