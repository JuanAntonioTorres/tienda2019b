package controller;

import dao.GenericDao;
import dto.Login;
import dto.PersonalData;
import error.Error;
import procedures.ProceduresClient;
import reflection.SessionTransferObject;
import validators.ClientValidator;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
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

@WebServlet("/updatePersonalData")
public class UpdatePersonalDataController extends HttpServlet {

    private static final long serialVersionUID = 1L;
    HttpSession session;
    private RequestDispatcher rd;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            iniciarDatos(request, response);
            PersonalData personalData = null;
            new SessionTransferObject(session,personalData);
            if (validarCliente(personalData)) {
                actualizarCliente(request);
            }
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | ClassNotFoundException | SQLException | ParseException e) {
            e.printStackTrace();
        }

        rd = request.getRequestDispatcher("client/index.jsp");
        rd.forward(request, response);
    }

    private void actualizarCliente(HttpServletRequest request) throws IllegalAccessException, InstantiationException, InvocationTargetException, ClassNotFoundException, SQLException, ParseException {
        PersonalData personalData = new PersonalData(request, session);
        Login login = new Login(request, session);
        if ((Integer) new GenericDao().execProcedure(ProceduresClient.UPDATE_CLIENT_DAPER.getName(), personalData, login) > 0) {
            request.setAttribute("mensaje", "Modified personal data");
        } else {
            request.setAttribute("mensaje", "Error modifying personal data");
        }
    }

    private boolean validarCliente(PersonalData personalData) throws IllegalAccessException, InvocationTargetException, InstantiationException, ParseException, SQLException, ClassNotFoundException {
        ClientValidator clientValidator = new ClientValidator();

        ArrayList<Error> errors = null;

        errors = clientValidator.validate(personalData);

        return errors.isEmpty();
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        doPost(request, response);
    }
}

