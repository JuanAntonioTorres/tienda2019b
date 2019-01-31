package controller;

import dao.GenericDao;
import dto.Login;
import dto.LoginBloqueo;
import dto.PersonalData;
import error.Error;
import procedures.ProceduresClient;
import reflection.ObjectTransferSession;
import reflection.SessionTransferObject;
import validators.LoginValidator;
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
import java.util.Date;

@WebServlet("/validateSession")
public class ValidateSessionController extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private static final int INTENTOSPERMITIDOS = 3;
    private HttpSession session;
    private HttpServletRequest request;
    private String opcion;
    private RequestDispatcher requestDispatcher;
    private Login login;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            iniciarDatos(request);
            if (comprobarLogin()) {
                gestionarLoginCorrecto();
            } else {
                gestionarLoginIncorrecto();
            }
            this.requestDispatcher.forward(request, response);
        } catch (IllegalAccessException | InvocationTargetException | InstantiationException | ClassNotFoundException | SQLException | ParseException e) {
            e.printStackTrace();
        }
    }

    private void gestionarLoginIncorrecto() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        incrementarIntento();
        if (disponibilidadIntento()) {
            prepararMensaje("Cliente: Intentalo otra vez");
        } else {
            bloquear(request);
        }
    }

    private void bloquear(HttpServletRequest request) throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        if (opcion.equals("index")) {
            bloquearSinBaseDatos(request);
        } else {
            bloquearEnBaseDatos(request, login);
        }
    }

    private void gestionarLoginCorrecto() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        String nif = getNifDeDataBase();
        if (nif != null) {
            session.setAttribute("nif", nif);
            prepararMensaje(("Hola ").concat(nif));
        }
        if (opcion.equals("updatePersonalData")) {
            obtenerYcargarDaperEnSession(request);
        }
        seleccionarRequest("client/" + opcion + ".jsp");
    }

    private void bloquearEnBaseDatos(HttpServletRequest request, Login login) throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        new GenericDao().execProcedure(ProceduresClient.BLOCK_CLIENT.getName(), new LoginBloqueo(login));
        this.requestDispatcher = request.getRequestDispatcher("Mail");
    }

    private void bloquearSinBaseDatos(HttpServletRequest request) {
        session.setAttribute("horaBloqueo", new Date());
        request.setAttribute("mensaje", "Cliente: Intentos Agotados");
        seleccionarRequest("cliente/clientBlocking.jsp");
    }

    private void prepararMensaje(String textoMensaje) {
        request.setAttribute("mensaje", textoMensaje);
    }

    private void seleccionarRequest(String rutaDispatcher) {
        this.requestDispatcher = request.getRequestDispatcher(rutaDispatcher);
    }

    private void obtenerYcargarDaperEnSession(HttpServletRequest request) throws IllegalAccessException, InstantiationException, InvocationTargetException, ClassNotFoundException, SQLException, ParseException {
        PersonalData personalData = new PersonalData(request, session);
        new ObjectTransferSession().convertir(new GenericDao().execProcedure(ProceduresClient.GET_CLIENTE.getName(), personalData), session);
    }

    private void iniciarDatos(HttpServletRequest request) throws UnsupportedEncodingException, InvocationTargetException, IllegalAccessException {
        this.request = request;
        this.session = request.getSession();
        this.opcion = request.getParameter("opcion");
        this.request.setCharacterEncoding("UTF-8");
        this.requestDispatcher = request.getRequestDispatcher("client/login.jsp");
        this.login = new Login();
        new SessionTransferObject(session,this.login);
    }

    private boolean comprobarLogin() throws IllegalAccessException, InstantiationException, InvocationTargetException, ParseException, SQLException, ClassNotFoundException {
        LoginValidator loginValidator = new LoginValidator();
        ArrayList<Error> errors = loginValidator.validate(login);
        return errors.isEmpty() && getNifDeDataBase() != null;
    }

    private String getNifDeDataBase() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        return (String) new GenericDao().execProcedure(ProceduresClient.GET_NIF_LOGIN.getName(), login);
    }

    private boolean disponibilidadIntento() {
        return session.getAttribute("intentos") != null &&
                INTENTOSPERMITIDOS < (int) session.getAttribute("intentos");
    }

    private void incrementarIntento() {
        if (session.getAttribute("intentos") == null) session.setAttribute("intentos", 1);
        else session.setAttribute("intentos", (int) session.getAttribute("intentos") + 1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        doPost(request, response);
    }

}
