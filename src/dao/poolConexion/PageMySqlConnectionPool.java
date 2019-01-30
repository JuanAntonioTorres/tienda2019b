package dao.poolConexion;

import java.sql.SQLException;

public class PageMySqlConnectionPool extends  MysqlConnectionPool{
    private static final String url = "jdbc:mysql://localhost/paginaVistas?useInformationSchema=true&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";

    public PageMySqlConnectionPool() throws SQLException, ClassNotFoundException {
        super(url);
    }
}
