package validators;

import dto.Login;
import error.Error;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Objects;

public class LoginValidator {

    public  ArrayList<Error> validate(Login login) throws IllegalAccessException, InvocationTargetException, InstantiationException {
        ArrayList<Error> errors = new ArrayList<>();
        errors.add(new UserValidator(login.getUserName()).validate());
        errors.add(new PasswordValidator(login.getUserPassword()).validate());
        errors.removeIf(Objects::isNull);
        return errors;

    }

}
