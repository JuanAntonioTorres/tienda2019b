package controller;

import client.ComandValidateLogin;
import client.ComandValidatePersonalData;
import dao.GenericDao;
import dto.Login;
import dto.PersonalData;
import error.Error;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import procedures.ProceduresClient;
import reflection.JsonTransferObject;

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
import java.util.HashMap;
import java.util.Map;

@WebServlet("/register")
@MultipartConfig
public class RegisterController extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private HttpSession session;
    private JSONObject oneJson;
    private JSONArray arrayJson;
    private HashMap<String, Error> listaErrores;
    private HttpServletResponse response;
    private Login login;
    private PersonalData personalData;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

        try {
            iniciarDatos(request, response);
            new JsonTransferObject().transferir(login, (JSONObject) new JSONParser().parse(request.getParameter("json")));
            new JsonTransferObject().transferir(login, (JSONObject) new JSONParser().parse(request.getParameter("json")));
            if (comprobarDatos()) {
                gestionarDatosCorrecto();
            } else {
                gestionarDatosIncorrecto();
            }
        } catch (IllegalAccessException | InvocationTargetException | InstantiationException | ClassNotFoundException | SQLException | ParseException | org.json.simple.parser.ParseException | IOException e) {
            e.printStackTrace();
        }
    }

    private void gestionarDatosIncorrecto() throws IOException {
        for (Map.Entry<String, Error> entry : listaErrores.entrySet()) {
            System.out.println("JSON Errores");
            oneJson.put("control", entry.getKey());
            oneJson.put("mensajeError", entry.getValue().getMessage());
            arrayJson.add(oneJson);
        }
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(arrayJson.toJSONString());
    }


    private void gestionarDatosCorrecto() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException, IOException {
        if ((Integer) new GenericDao().execProcedure(ProceduresClient.INSERT_CLIENT.getName(), personalData, login) > 0) {
            session.setAttribute("pageName", "client");
            response.setCharacterEncoding("UTF-8");
            oneJson.put("nif" , login.getNif());
            response.getWriter().write(oneJson.toJSONString());
        }
    }

    private boolean comprobarDatos() throws IOException, IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        HashMap<String, Error> errors = new ComandValidateLogin(login).useCommands();
        errors.putAll(new ComandValidatePersonalData(personalData).useCommands());
        if (!errors.isEmpty()) {
            for (Map.Entry<String, Error> entry : errors.entrySet()) {
                oneJson.put("control", entry.getKey());
                oneJson.put("mensajeError", entry.getValue().getMessage());
                arrayJson.add(oneJson);
            }
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(arrayJson.toJSONString());
        }
        return true;
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        this.session = request.getSession();
        this.response = response;
        this.oneJson = new JSONObject();
        this.arrayJson = new JSONArray();
        this.login = new Login();
        this.personalData = new PersonalData();
    }

}

