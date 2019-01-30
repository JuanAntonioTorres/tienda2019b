package dao.poolConexion;

import dao.rol.Rol;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface ConnectionPool {

    Connection getConnection(Rol poliRol) throws SQLException, ClassNotFoundException;

    boolean releaseConnection(Connection connection);

    List<Connection> getConnectionPool();

    int getSize();

    String getUrl();

    String getUser();

    String getPassword();

    void shutdown() throws SQLException;
}