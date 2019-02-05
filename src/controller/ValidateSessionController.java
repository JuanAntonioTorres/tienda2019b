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

    private static final long serialVersionUID = 1L;
    private static final int INTENTOSPERMITIDOS = 3;
    private HttpSession session;
    private HttpServletResponse response;
    private Login login;
    private JSONObject oneJson;
    private JSONArray arrayJson;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            iniciarDatos(request,response);
            new JsonTransferObject().transferir(login,(JSONObject) new JSONParser().parse(request.getParameter("json")));
            if (comprobarLogin()) {
                gestionarLoginCorrecto();
            } else {
                gestionarLoginIncorrecto();
            }
        } catch (IllegalAccessException | InvocationTargetException | InstantiationException | ClassNotFoundException | SQLException | ParseException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }
    }

    private void gestionarLoginIncorrecto() throws IOException {
        incrementarIntento();
        if (!disponibilidadIntento()) {
            session.setAttribute("horaBloqueo", new Date());
            oneJson.put("tiempoMaximoBloqueo",session.getAttribute("tiempoMaximoBloqueo"));
        }

        oneJson.put("maxIntento", session.getAttribute("maxIntento"));
        oneJson.put("intento", session.getAttribute("intento"));

        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(oneJson.toJSONString());
    }

    private void gestionarLoginCorrecto() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException, IOException {
        login.setNif(getNifDeDataBase());
        if(login.getNif()!=null){
            session.setAttribute("pageName","client");
            response.setCharacterEncoding("UTF-8");
            oneJson.put("nif" , login.getNif());
            response.getWriter().write(oneJson.toJSONString());
        }
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        this.session = request.getSession();
        this.response = response;
        this.login = new Login();
        this.oneJson = new JSONObject();
        this.arrayJson = new JSONArray();
    }

    private boolean comprobarLogin() throws IOException {
        HashMap <String,Error> errors = new ComandValidateLogin(login).useCommands();
        if(!errors.isEmpty()){
            for(Map.Entry<String, Error> entry : errors.entrySet()) {
                oneJson.put("control" ,entry.getKey());
                oneJson.put("mensajeError" , entry.getValue().getMessage());
                arrayJson.add(oneJson);
            }
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(arrayJson.toJSONString());
        }
        return true;
    }

    private String getNifDeDataBase() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, InvocationTargetException, ParseException {
        return (String) new GenericDao().execProcedure(ProceduresClient.GET_NIF_LOGIN.getName(), login);
    }

    private boolean disponibilidadIntento() {
        return session.getAttribute("intento") != null &&
                INTENTOSPERMITIDOS < (int) session.getAttribute("intento");
    }

    private void incrementarIntento() {
        if (session.getAttribute("intento") == null) session.setAttribute("intento", 1);
        else session.setAttribute("intento", (int) session.getAttribute("intento") + 1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }

}
