package controller;

import dao.GenericDao;
import dto.Login;
import procedures.ProceduresClient;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;

@WebServlet("/valiCliUpdateLogin")
@MultipartConfig
public class UpdateLoginController extends ClientController {

    @Override
    protected boolean accion() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException, org.json.simple.parser.ParseException {
        Login login = new Login((int)session.getAttribute("idClient"));
        super.transferJsonToObject(login);
        if(existeLogin(login)){
            return ((Integer) new GenericDao().execProcedure(ProceduresClient.UPDATE_LOGIN.getName(), login)) > 0;
        }
    return false;
    }

    private boolean existeLogin(Login login) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        return new GenericDao().execProcedure(ProceduresClient.GET_ID_LOGIN.getName(),login)==null;
    }

    @Override
    protected String getNombreAccion() {
        return "updateLogin";
    }

    @Override
    protected String getNombreSiguientePagina() {
        return "client";
    }

}
