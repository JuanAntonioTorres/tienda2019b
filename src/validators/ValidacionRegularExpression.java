package validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidacionRegularExpression {

    protected Boolean validar(String value,String patron){

        Pattern pattern = Pattern.compile(patron);

        Matcher matcher = pattern.matcher(value);

        return matcher.matches();

    }
}
