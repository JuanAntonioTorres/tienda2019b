package dao.rol;

import dao.poolConexion.ClienteMySqlConnectionPool;

import java.sql.Connection;
import java.sql.SQLException;

public class PhoneModelRol extends Rol {

    private static final String usuario = "root";
    private static final String pass = "";
    private static final int conexionesIniciales = 1;
    private static final int conexionesMaximas = 1;

    //este constructor es usado por la reflexion en GenericDao
    public PhoneModelRol() throws SQLException, ClassNotFoundException {
        super(usuario,pass,conexionesIniciales,conexionesMaximas,new ClienteMySqlConnectionPool());
    }

    public Connection getConnection () throws SQLException, ClassNotFoundException {
        return super.getConnection(this);
    }
}
