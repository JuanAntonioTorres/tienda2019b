package dao.poolConexion;

import java.sql.SQLException;

public class ClienteMySqlConnectionPool extends MysqlConnectionPool{
    private static final String url = "jdbc:mysql://localhost/tienda_harnina20189vistas?useInformationSchema=true&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

    public ClienteMySqlConnectionPool() throws SQLException, ClassNotFoundException {
        super(url);
    }

}
