package client;

import dto.Login;
import error.Error;
import validators.PasswordValidator;
import validators.UserValidator;

import java.util.HashMap;

public class ComandValidateLogin implements ComandValidate {

    Login login;

    public ComandValidateLogin(Login login) {
        this.login = login;
    }

    public HashMap<String, Error> useCommands() {

        HashMap<String, Error> errors = new HashMap<>();
        errors.put("userName", new UserValidator(login.getUserName()).validate());
        errors.put("userPassword", new PasswordValidator(login.getUserPassword()).validate());
        errors.entrySet().removeIf(entries -> entries.getValue() == null);

        return errors;
    }
}
