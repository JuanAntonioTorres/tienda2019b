package validators;

import error.Error;

import java.util.ArrayList;

public interface ICompositeValidator {
    ArrayList<Error> validate(Validator validators[]);
}
