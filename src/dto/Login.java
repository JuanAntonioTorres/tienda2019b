package dto;

import reflection.RequestTransferSession;
import reflection.SessionTransferObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;

public class Login {

    private String nif;
    private String userName;
    private String userPassword;

    public Login() {
    }

    public Login(String usuario, String password) {
        this.userName = usuario;
        this.userPassword = password;
    }

    public Login(String nif, String userName, String userPassword) {
        this.nif = nif;
        this.userName = userName;
        this.userPassword = userPassword;
    }

    public Login(HttpServletRequest request, HttpSession session) throws IllegalAccessException, InvocationTargetException {
        new RequestTransferSession().guardarDatosSesion(request, session);
        new SessionTransferObject(session, this);
    }

    public Login(String nif) {
        this.nif = nif;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}

