package dao.poolConexion;


import java.sql.SQLException;

public class H2ConnectionPool extends  BasicConnectionPool{
    private static final String driver = "org.h2.Driver";

    protected H2ConnectionPool(String url) throws SQLException, ClassNotFoundException {
        super(driver,url);
    }

}
