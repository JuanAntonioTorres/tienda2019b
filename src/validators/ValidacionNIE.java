package validators;

import error.Error;

//X1234567L
public class ValidacionNIE implements Validator {

    private String nie;

    private static final String mensajeError = "NIE Incorrecto";

    public ValidacionNIE(String nie) {
        this.nie = nie;
    }

    @Override
    public Error validate() {

        boolean esValido = false;
        int i = 1;
        int caracterASCII = 0;
        char letra = ' ';
        int miNIE = 0;
        int resto = 0;
        char[] asignacionLetra = {'T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'};

        if (nie.length() == 9 && Character.isLetter(nie.charAt(8))
                && nie.substring(0, 1).toUpperCase().equals("X")
                || nie.substring(0, 1).toUpperCase().equals("Y")
                || nie.substring(0, 1).toUpperCase().equals("Z")) {

            do {
                caracterASCII = nie.codePointAt(i);
                esValido = (caracterASCII > 47 && caracterASCII < 58);
                i++;
            } while (i < nie.length() - 1 && esValido);
        }
        if (esValido && nie.substring(0, 1).toUpperCase().equals("X")) {
            nie = "0" + nie.substring(1, 9);
        } else if (esValido && nie.substring(0, 1).toUpperCase().equals("Y")) {
            nie = "1" + nie.substring(1, 9);
        } else if (esValido && nie.substring(0, 1).toUpperCase().equals("Z")) {
            nie = "2" + nie.substring(1, 9);
        }

        if (esValido) {
            letra = Character.toUpperCase(nie.charAt(8));
            miNIE = Integer.parseInt(nie.substring(0, 8));
            resto = miNIE % 23;
            esValido = (letra == asignacionLetra[resto]);
        }

        if (esValido) {
            return null;
        } else {
            return Error.ERROR_NIE_BAD;
        }
    }

}
