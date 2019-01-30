package dao.rol;

import dao.poolConexion.BasicConnectionPool;

import java.sql.Connection;
import java.sql.SQLException;

public abstract class Rol implements Roleable {

    private String usuario;
    private String pass ;
    private int conexionesIniciales;
    private int conexionesMaximas;
    private final BasicConnectionPool basicConnectionPool;

    public Rol(String usuario, String pass, int conexionesIniciales, int conexionesMaximas, BasicConnectionPool basicConnectionPool) {
        this.usuario = usuario;
        this.pass = pass;
        this.conexionesIniciales = conexionesIniciales;
        this.conexionesMaximas = conexionesMaximas;
        this.basicConnectionPool = basicConnectionPool;
    }

    public Connection getConnection(Rol rol) throws SQLException, ClassNotFoundException {
        return basicConnectionPool.getConnection(rol);
    }

    @Override
    public String getUsuario() {
        return usuario;
    }

    @Override
    public String getPass() {
        return pass;
    }

    @Override
    public int getConexionesIniciales() {
        return conexionesIniciales;
    }

    @Override
    public int getConexionesMaximas() {
        return conexionesMaximas;
    }

}
