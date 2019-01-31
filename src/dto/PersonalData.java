package dto;

import reflection.RequestTransferSession;
import reflection.SessionTransferObject;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Table;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;
import java.util.Objects;

@Table(name = "client", schema = "tienda_harnina20189vistas")
public class PersonalData {

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

    public PersonalData() {
    }

    @Basic
    @Column(name = "nif")
    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    @Basic
    @Column(name = "lastName")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "firstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "postalCode")
    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "birthDate")
    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    @Basic
    @Column(name = "phone")
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "sex")
    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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




