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
        Login login = new Login(String.valueOf(session.getAttribute("nif")));
        super.transferJsonToObject(login);
        return ((Integer) new GenericDao().execProcedure(ProceduresClient.UPDATE_LOGIN.getName(), login)) > 0;
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
