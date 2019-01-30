package dao.poolConexion;

import dao.rol.Rol;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BasicConnectionPool implements ConnectionPool {

    private List<Connection> connectionPool;
    private final List<Connection>  usedConnections = new ArrayList<>();
    private final String url;
    private final String driver;
    private Rol rol;


    protected BasicConnectionPool(String driver, String url) {
        this.url = url;
        this.driver = driver;
    }

    private static Connection createConnection(String url, String user, String password) throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    private void crearpull(Rol poliRol) throws ClassNotFoundException, SQLException {
        this.rol = poliRol;
        connectionPool = new ArrayList<>(poliRol.getConexionesIniciales());
        Class.forName(driver);
        for (int i = 0; i < poliRol.getConexionesIniciales(); i++) {
            connectionPool.add(createConnection(url, poliRol.getUsuario(), poliRol.getPass()));
        }
    }

    @Override
    public Connection getConnection(Rol poliRol) throws SQLException, ClassNotFoundException {
        if (connectionPool==null) {
            crearpull(poliRol);
            if (usedConnections.size() < poliRol.getConexionesMaximas()) {
                connectionPool.add(createConnection(url, poliRol.getUsuario(), poliRol.getPass()));
            } else {
                throw new RuntimeException("Se alcanzó el tamaño máximo del pool, no hay conexiones disponibles!");
            }
        }
        Connection connection = connectionPool.remove(connectionPool.size() - 1);
        usedConnections.add(connection);
        return connection;
    }

    @Override
    public boolean releaseConnection(Connection connection) {
        connectionPool.add(connection);
        return usedConnections.remove(connection);
    }

    @Override
    public int getSize() {
        return connectionPool.size() + usedConnections.size();
    }

    @Override
    public List<Connection> getConnectionPool() {
        return connectionPool;
    }

    @Override
    public String getUrl() {
        return url;
    }

    @Override
    public String getUser() {
        return rol.getUsuario();
    }

    @Override
    public String getPassword() {
        return rol.getPass();
    }

    @Override
    public void shutdown() throws SQLException {
        usedConnections.forEach(this::releaseConnection);
        for (Connection c : connectionPool) {
            c.close();
        }
        connectionPool.clear();
    }


}