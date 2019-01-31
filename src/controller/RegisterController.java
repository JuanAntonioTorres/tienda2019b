package controller;

import dao.GenericDao;
import dto.Login;
import dto.PersonalData;
import error.Error;
import procedures.ProceduresClient;
import utils.ImageCharger;
import validators.ClientValidator;
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

@WebServlet("/register")
@MultipartConfig
public class RegisterController extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private HttpSession session;
    private PersonalData personalData;
    private Login login;
    private RequestDispatcher rd;


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            iniciarDatos(request, response);
            if (validarRegistro()) {
                guardarImagen(request);
                guardarCliente(request);
            } else {
                request.setAttribute("mensaje", "Cliente NO add");
            }
        } catch (IllegalAccessException | InstantiationException | InvocationTargetException | ParseException | SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        rd.forward(request, response);
    }

    private void guardarCliente(HttpServletRequest request) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        if (insertadoCorrecto()) {
            request.setAttribute("mensaje", "Cliente add");
            rd = request.getRequestDispatcher("client/index.jsp");
        } else request.setAttribute("mensaje", "Cliente NO add");
    }

    private boolean insertadoCorrecto() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        return (Integer) new GenericDao().execProcedure(ProceduresClient.INSERT_CLIENT.getName(), personalData, login) > 0;
    }

    private void guardarImagen(HttpServletRequest request) throws IOException, ServletException {
        new ImageCharger(request.getPart("image"), getServletContext().getRealPath("img/fotoClient/"), personalData.getNif()).clientFotoLoad();
    }

    private boolean validarRegistro() throws IllegalAccessException, InstantiationException, InvocationTargetException, ParseException, SQLException, ClassNotFoundException {
        ArrayList<Error> errors = new ClientValidator().validate(personalData);
        errors.addAll(new LoginValidator().validate(login));
        return errors.isEmpty();
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IllegalAccessException, InvocationTargetException, InstantiationException {
        rd = request.getRequestDispatcher("client/register.jsp");
        session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        personalData = new PersonalData(request, session);
        login = new Login(request, session);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }


}

