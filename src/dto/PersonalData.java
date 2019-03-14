package dto;

import reflection.RequestTransferSession;
import reflection.SessionTransferObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;
import java.util.Objects;

public class PersonalData {

    private String idClient;
    private String nif;
    private String lastName;
    private String firstName;
    private String address;
    private String postalCode;
    private String birthDate;
    private String phone;
    private String mobile;
    private String sex;
    private String email;
    private String image;

    //TODO usar HasMapTransferObject
    public PersonalData(HttpServletRequest request, HttpSession session) throws IllegalAccessException, InstantiationException, InvocationTargetException {
        new RequestTransferSession().guardarDatosSesion(request, session);
        new SessionTransferObject(session, this);
    }
    public PersonalData(String nif) {
        this.nif = nif;
    }

    public PersonalData() {
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdClient() {
        return idClient;
    }

    public void setIdClient(String idClient) {
        this.idClient = idClient;
    }

    @Override
    public int hashCode() {
        return Objects.hash(nif, lastName, firstName, address, birthDate, phone, mobile, sex, email);
    }

    @Override
    public String toString() {
        return getNif() + " " + getFirstName() + " " + getLastName() + " " + getPostalCode() + " " + getAddress()
                + " " + getEmail() + " " + getBirthDate() + " " + getMobile() + " " + getPhone() + " " + getSex();
    }
}




