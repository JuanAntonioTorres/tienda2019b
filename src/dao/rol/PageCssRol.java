package dao.rol;

import dao.poolConexion.PageMySqlConnectionPool;

import java.sql.Connection;
import java.sql.SQLException;

public class PageCssRol extends Rol {

    private static final String usuario = "root";
    private static final String pass = "";
    private static final int conexionesIniciales = 3;
    private static final int conexionesMaximas = 5;

    //este constructor es usado por la reflexion en GenericDao
    public PageCssRol() throws SQLException, ClassNotFoundException {
        super(usuario,pass,conexionesIniciales,conexionesMaximas,new PageMySqlConnectionPool());
    }

    public Connection getConnection () throws SQLException, ClassNotFoundException {
        return super.getConnection(this);
    }
}
