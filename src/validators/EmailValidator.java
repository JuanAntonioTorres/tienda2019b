package validators;

import error.Error;

public class EmailValidator extends ValidacionRegularExpression implements Validator {

    private static final String patron = "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$";

    private String value;

    public EmailValidator(String value){

        this.value = value;

    }
    @Override
    public Error validate(){
        if (super.validar(value,patron)){
            return null;
        }

        return Error.ERROR_EMAIL_BAD;
    }
}
