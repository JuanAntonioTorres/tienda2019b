package dao.rol;

import java.sql.Connection;
import java.sql.SQLException;

public interface Roleable {

    public String getUsuario();

	public String getPass();

	public int getConexionesIniciales();

	public int getConexionesMaximas();

    Connection getConnection() throws SQLException, ClassNotFoundException;
}
