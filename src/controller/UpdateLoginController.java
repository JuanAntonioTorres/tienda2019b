package controller;

import dao.GenericDao;
import dto.Login;
import error.Error;
import procedures.ProceduresClient;
import validators.LoginValidator;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

@WebServlet("/valiCliUpdateLogin")
@MultipartConfig
public class UpdateLoginController extends HttpServlet {

    private static final long serialVersionUID = 1L;

    HttpSession session;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        iniciarDatos(request, response);

        try {
            Login login = new Login(request, session);
            if (validarLogin(login)) {
                actualizarLogin(request, login);
            }
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | ClassNotFoundException | SQLException | ParseException e) {
            e.printStackTrace();
        }

        RequestDispatcher rd = request.getRequestDispatcher("client/index.jsp");
        rd.forward(request, response);

    }

    private void actualizarLogin(HttpServletRequest request, Login login) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        if ((Integer) new GenericDao().execProcedure(ProceduresClient.UPDATE_LOGIN.getName(), login) > 0) {
            request.setAttribute("mensaje", "Modified login");
        } else request.setAttribute("mensaje", "The login could not be modified");
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
    }

    private boolean validarLogin(Login login) throws IllegalAccessException, InstantiationException, InvocationTargetException {
        ArrayList<Error> errors = null;
        errors = new LoginValidator().validate(login);
        return errors.isEmpty();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

}
