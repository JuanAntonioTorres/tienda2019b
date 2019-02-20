package controller;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import reflection.JsonTransferObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.applet.Applet;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;

public abstract class ClientController extends HttpServlet {

    private static final long serialVersionUID = 1L;
    HttpSession session;
    private JSONObject oneJson;
    private HttpServletResponse response;
    private HttpServletRequest request;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        iniciarDatos(request, response);

        try {
            if (accion()) gestionarAccionCorrecto();
            else gestionarAccionNoCorrecto();

        } catch (IllegalAccessException | ParseException | InstantiationException | SQLException | InvocationTargetException | ClassNotFoundException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }
        llamadaAjax(oneJson.toJSONString());
    }

    protected abstract boolean accion() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException, org.json.simple.parser.ParseException;

    protected abstract String getNombreAccion();

    protected abstract String getNombreSiguientePagina();

    protected void transferJsonToObject(Object object) throws InvocationTargetException, IllegalAccessException, org.json.simple.parser.ParseException {
        new JsonTransferObject().transferir(object, (JSONObject) new JSONParser().parse(request.getParameter("json")));
    }

    private void gestionarAccionNoCorrecto() {
        this.oneJson.put("errorVerificacion", "Error"+ getNombreAccion());
        this.oneJson.put("estado", "ERROR");
    }

    private void gestionarAccionCorrecto() {
        session.setAttribute("paginaActiva", getNombreSiguientePagina());
        this.oneJson.put("estado", "OK");
    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) {
        this.session = request.getSession();
        this.oneJson = new JSONObject();
        this.response = response;
        this.request = request;
    }

    private void llamadaAjax(String s) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(s);
    }

}
