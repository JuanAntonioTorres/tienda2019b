package controller;

import dao.GenericDao;
import dto.Carrito;
import org.json.simple.JSONArray;
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

@WebServlet("/guardarCarrito")
public class CarritoGuardarController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    HttpSession session;
    JSONObject oneJson;
    boolean guardado;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        session = request.getSession();
        response.setCharacterEncoding("UTF-8");

        try {

            JSONArray lineasCarrito = (JSONArray) new JSONParser().parse(request.getParameter("arrayCache"));
            JSONArray lineasBorradas = (JSONArray) new JSONParser().parse(request.getParameter("arrayBorrado"));

            Carrito carrito = new Carrito();

            lineasBorradas.forEach(linea -> {
                try {

                    new JsonTransferObject().transferir(carrito, (JSONObject) linea);
                    carrito.setIdCliente((int) session.getAttribute("idClient"));
                    if ( ! (Boolean) new GenericDao().execProcedure(ProceduresProductos.DELETE_LINEA.getName(), carrito)) {
                        guardado = false;
                    }

                } catch (InvocationTargetException | IllegalAccessException | InstantiationException | ClassNotFoundException | SQLException | ParseException e1) {
                    e1.printStackTrace();
                }
            });

            lineasCarrito.forEach(linea -> {
                try {

                    new JsonTransferObject().transferir(carrito, (JSONObject) linea);
                    carrito.setIdCliente((int) session.getAttribute("idClient"));
                    if ( ! (Boolean) new GenericDao().execProcedure(ProceduresProductos.ADD_LINEA.getName(), carrito)) {
                        guardado = false;
                    }

                } catch (InvocationTargetException | IllegalAccessException | InstantiationException | ClassNotFoundException | SQLException | ParseException e1) {
                    e1.printStackTrace();
                }
            });

            if (guardado) {
                oneJson = new JSONObject();
                oneJson.put("guardado", "OK");
            }

        } catch (org.json.simple.parser.ParseException e1) {
            e1.printStackTrace();
        }

        response.getWriter().write(oneJson.toJSONString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
