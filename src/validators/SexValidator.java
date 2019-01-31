package validators;

import error.Error;

public class SexValidator extends ListOfValuesValidator implements Validator {
    private static final String [] valores  = {"m" , "f"};

    private static final String error = "El  valor no esta en la lista";

    private String value;

    public SexValidator(String value) {
        this.value = value;
    }

    @Override
    public Error validate(){
        if (super.validar(value,valores)) {
            return null;
        }

        return Error.ERROR_NOTIN;
    }



}
