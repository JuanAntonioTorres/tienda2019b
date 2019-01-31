package validators;

import error.Error;

public class DNINIFValidator implements Validator {

    private String dni;

    public DNINIFValidator(String dni) {
        this.dni = dni;
    }

    @Override
    public Error validate() {

        String letraMayuscula = (this.dni.substring(8)).toUpperCase();

        String losNumeros = this.dni.substring(0, 8);

        if (dni.length() != 9 || Character.isLetter(this.dni.charAt(8)) == false) {
            return Error.ERROR_NIF_LENGTH;
        }

        if (soloNumeros(losNumeros) == true && getLetraDNI().equals(letraMayuscula)) {
            return null;
        }
        return Error.ERROR_NIF_8DIGIT_LETTER;
    }


    private boolean soloNumeros(String cadena) {
        int i, j = 0;
        int cuenta = 0;
        String unNumero = "";
        String[] numeros = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

        for (i = 0; i < cadena.length(); i++) {
            unNumero = cadena.substring(i, i + 1);

            for (j = 0; j < numeros.length; j++) {
                if (unNumero.equals(numeros[j])) {
                    cuenta++;
                }
            }
        }

        if (cuenta != cadena.length()) {
            return false;
        }

        return true;
    }

    private String getLetraDNI() {
        int miDNI = Integer.parseInt(this.dni.substring(0, 8));
        int resto = 0;
        String letra = "";
        String[] letras = {"T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"};
        resto = miDNI % 23;
        letra = letras[resto];

        return letra;
    }
}
