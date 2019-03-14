package controller;

import dao.GenericDao;
import dto.Login;
import procedures.ProceduresClient;
import javax.servlet.annotation.WebServlet;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;

@WebServlet("/delete")
public class DeleteController extends ClientController {

    @Override
    protected boolean accion() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        Login login = new Login((int)session.getAttribute("idClient"));
        return ((Integer) new GenericDao().execProcedure(ProceduresClient.DELETE_CLIENT.getName(), login)) > 0;
    }

    @Override
    protected String getNombreAccion() {
        return "Borrar";
    }

    @Override
    protected String getNombreSiguientePagina() {
        return "index";
    }
}