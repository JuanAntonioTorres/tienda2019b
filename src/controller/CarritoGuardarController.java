package controller;

import com.mysql.fabric.xmlrpc.Client;
import dao.GenericDao;
import dto.Carrito;
import dto.Login;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import procedures.ProceduresProductos;
import reflection.JsonTransferObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

@WebServlet("/guardarCarrito")
public class CarritoGuardarController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    HttpSession session;
    JSONObject oneJson;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        session = request.getSession();
        response.setCharacterEncoding("UTF-8");
        Carrito carrito = new Carrito();
        try {
            Login login = new Login((int) session.getAttribute("idClient"));
            new JsonTransferObject().transferir(carrito, (JSONObject) new JSONParser().parse(request.getParameter("json")));
            boolean guardado  = (boolean) new GenericDao().execProcedure(ProceduresProductos.GET_CARRITO.getName(), carrito,login);
           if(guardado){
               oneJson = new JSONObject();
               oneJson.put("guardado", "OK");
           }

        } catch (SQLException | InstantiationException | IllegalAccessException | ClassNotFoundException | InvocationTargetException | ParseException | org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }
        response.getWriter().write(oneJson.toJSONString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
