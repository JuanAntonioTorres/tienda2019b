package validators;

import error.Error;

/**
 * Clase que calcula o valida un documento de identificación del reino de España. (DNI,NIE,CIF).
 * @author yo
 * El antecedente del NIF es el CIF, utilizado en personas jurídicas
 */
public class DNINIECIFValidator implements Validator {

    private String documento;
    private static final  String mensajeError = "Documento Incorrecto";

    public DNINIECIFValidator(String documento){
        this.documento = documento;
    }

    @Override
    public Error validate() {
        DNINIFValidator DNINIFValidator = new DNINIFValidator(documento);
        if (DNINIFValidator.validate()!= null){
            ValidacionNIE validacionNIE = new ValidacionNIE(documento);
            if(validacionNIE.validate() != null){
                ValidacionNIFCIF validacionNIFCIF = new ValidacionNIFCIF(documento);
                if(validacionNIFCIF.validate() != null){
                    return Error.ERROR_NIF_8DIGIT_LETTER;
                }
            }
        }

        return null;
    }



}
