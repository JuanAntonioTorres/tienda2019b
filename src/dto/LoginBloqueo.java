package dto;

import java.util.UUID;

public class LoginBloqueo extends Login {
    private String clave;
    private String email;

    public LoginBloqueo() {
        super();
    }

    public LoginBloqueo(Login login) {
        super(login.getIdClient(), login.getUserName(), login.getUserPassword());
        String uuid = UUID.randomUUID().toString();
        this.clave = uuid.substring(0, Math.min(uuid.length(), 50));
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
