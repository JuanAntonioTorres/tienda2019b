package validators;

import error.Error;

import java.util.ArrayList;

public class ImageNameValidatorI extends CompositeValidator {

    private String value;
    private String[] lista = {"jpg", "png"};

    public ImageNameValidatorI(String value) {
        this.value = value;
    }


    public ArrayList<Error> validate() {
        String nombreImagen = new String(value.substring(0, value.lastIndexOf('.')));
        String extension = new String(value.substring(value.lastIndexOf('.') + 1));

        Validator[] validadores = {new ExtensionFileValidator(extension, this.lista), new ValidacionLetrasSinEspacio(nombreImagen)};

        return super.validate(validadores);
    }
}
