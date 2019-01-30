package dao.poolConexion;

public class MysqlConnectionPool extends BasicConnectionPool{

    private static final String driver = "com.mysql.jdbc.Driver";

    protected MysqlConnectionPool(String url) {
        super(driver,url);
    }

}
