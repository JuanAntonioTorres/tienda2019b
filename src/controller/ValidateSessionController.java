package controller;

import client.ComandValidateLogin;
import dao.GenericDao;
import dto.Login;
import error.Error;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import procedures.ProceduresClient;
import reflection.JsonTransferObject;

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
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/validateSession")
public class ValidateSessionController extends HttpServlet {

    //TODO posibles parametros del Json METER EN ENUM si hay tiempo y hacer lo mismo con los de session
    private static final String ERROR = "mensajeError", ERRORVERIFICACION ="errorVerificacion",
            MAX_INTENTO = "maxIntento", INTENTO = "intento", NIF = "nif", CONTROL = "control";

    private static final long serialVersionUID = 1L;
    private static final int INTENTOSPERMITIDOS = 3;
    private HttpSession session;
    private HttpServletResponse response;
    private Login login;
    private JSONObject oneJson;
    private JSONArray arrayJson;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            iniciarDatos(request, response);
            transferJsonToObject(request,login);
            if (validarLogin() && verificarLogin()) {
                gestionarLoginCorrecto();
            } else {
                gestionarLoginIncorrecto();
            }//chin pum
        } catch (IllegalAccessException | InvocationTargetException | InstantiationException | ClassNotFoundException | SQLException | ParseException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }
    }

    private void transferJsonToObject(HttpServletRequest request, Object object) throws InvocationTargetException, IllegalAccessException, org.json.simple.parser.ParseException {
        new JsonTransferObject().transferir(object, (JSONObject) new JSONParser().parse(request.getParameter("json")));
    }

    private boolean verificarLogin() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException, IOException {
        login.setNif(getNifDeDataBase());
        if (login.getNif() == null) {
            oneJson.put(ERRORVERIFICACION,"error de verificacion");
            return false;
        }
        return true;
    }

    private void llamadaAjax(String s) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(s);
    }

    private void gestionarLoginIncorrecto() throws IOException {
        incrementarIntento();
        oneJson.put(MAX_INTENTO, INTENTOSPERMITIDOS);
        oneJson.put(INTENTO, session.getAttribute("intento"));
        llamadaAjax(oneJson.toJSONString());
    }

    private void gestionarLoginCorrecto() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException, IOException {
        session.setAttribute("pageName", "client");
        oneJson.put(NIF, login.getNif());
        llamadaAjax(oneJson.toJSONString());
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        this.session = request.getSession();
        this.response = response;
        this.login = new Login();
        this.oneJson = new JSONObject();
        this.arrayJson = new JSONArray();
    }

    private boolean validarLogin() throws IOException {
        HashMap<String, Error> errors = new ComandValidateLogin(login).useCommands();
        if (!errors.isEmpty()) {
            for (Map.Entry<String, Error> entry : errors.entrySet()) {
                oneJson.put(CONTROL, entry.getKey());
                oneJson.put(ERROR, entry.getValue().getMessage());
                arrayJson.add(oneJson);
            }
            llamadaAjax(arrayJson.toJSONString());
        }
        return true;
    }

    private String getNifDeDataBase() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        return (String) new GenericDao().execProcedure(ProceduresClient.GET_NIF_LOGIN.getName(), login);
    }

    private void incrementarIntento() {
        if (session.getAttribute("intento") == null) session.setAttribute("intento", 0);
        else session.setAttribute("intento", (int) session.getAttribute("intento") + 1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }

}
