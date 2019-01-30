package dao.poolConexion;

import java.sql.SQLException;

public class ClienteH2ConnectionPool extends H2ConnectionPool{
    private static final String url = "jdbc:h2:~/tienda189"; //jdbc:h2:mem:db

    public ClienteH2ConnectionPool() throws SQLException, ClassNotFoundException {
        super(url);
    }
}
