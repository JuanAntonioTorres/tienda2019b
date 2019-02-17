package client;

import dto.PersonalData;
import dto.PostalCode;
import error.Error;
import validators.*;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;

public class ComandValidatePersonalData implements ComandValidate {
    PersonalData personalData;

    public ComandValidatePersonalData(PersonalData personalData) {
        this.personalData = personalData;
    }


    @Override
    public HashMap<String, Error> useCommands() throws SQLException, ClassNotFoundException, InvocationTargetException, InstantiationException, ParseException, IllegalAccessException {
        HashMap<String,Error> errors = new HashMap<>();
        errors.put("nif",new DNINIECIFValidator(personalData.getNif()).validate());
        errors.put("firstName",new ValidacionLetrasConEspacio(personalData.getFirstName()).validate());
        errors.put("firstName",new LengthValidator(personalData.getFirstName(), 3, 50).validate());
        errors.put("lastName",new ValidacionLetrasConEspacio(personalData.getLastName()).validate());
        errors.put("lastName",new LengthValidator(personalData.getLastName(), 15, 100).validate());
        errors.put("postalCode",new PostalCodeValidator(personalData.getPostalCode()).validate());
        errors.put("address",new ValidarDomicilio(personalData.getAddress()).validate());
        errors.put("address",new LengthValidator(personalData.getAddress(), 2, 100).validate());
        errors.put("phone",new ValidacionTelefonoSpain(personalData.getPhone()).validate());
        errors.put("mobile",new ValidacionTelefonoSpain(personalData.getMobile()).validate());
        errors.put("birthDate",new DateValidator(personalData.getBirthDate().toString()).validate());
        errors.put("sex",new SexValidator(personalData.getSex()).validate());
        errors.put("email",new EmailValidator(personalData.getEmail()).validate());
        errors.put("postalCode",new VerificacionCodigoPostal(new PostalCode(personalData.getPostalCode()).check_cp()).validate());
        errors.entrySet().removeIf(entries->entries.getValue() == null);
        return errors;
    }
}
