package controller;

import dao.GenericDao;
import dto.PhoneModel;
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
import java.util.ArrayList;
import java.util.LinkedList;

@WebServlet("/getProducts")
public class ModelController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    HttpSession session;
    JSONObject oneJson;
    JSONArray arrayJson = null;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        arrayJson = new JSONArray();
        session = request.getSession();
        response.setCharacterEncoding("UTF-8");
        ArrayList<PhoneModel> listaModels = null;
        PhoneModel phoneModel = new PhoneModel();
        try {
            new JsonTransferObject().transferir(phoneModel, (JSONObject) new JSONParser().parse(request.getParameter("json")));
            listaModels = (ArrayList<PhoneModel>) new GenericDao().execProcedure(ProceduresProductos.GET_MODELOS.getName(),phoneModel);
            listaModels.forEach(modeloEntity -> {
                oneJson = new JSONObject();
                oneJson.put("idModelo",modeloEntity.getIdModelo());
                oneJson.put("nombreModelo", modeloEntity.getNombreModelo());
                oneJson.put("refModelo",modeloEntity.getRefModelo());
                oneJson.put("precioCompra", modeloEntity.getActualPrecioModelo());
                oneJson.put("stockActualModelo",modeloEntity.getStockActualModelo());
                oneJson.put("nombreModelo", modeloEntity.getNombreModelo());
                oneJson.put("descripcionModelo",modeloEntity.getDescripcionModelo());
                oneJson.put("nombreMarca", modeloEntity.getNombreMarcaMarca());
                oneJson.put("imagenDelantera", modeloEntity.getRutaImagen());
                oneJson.put("imagenTrasera", modeloEntity.getRutaImagenBack());
                oneJson.put("imagenLado", modeloEntity.getRutaImagenSide());
                arrayJson.add(oneJson);
            });
        } catch (SQLException | InstantiationException | IllegalAccessException | ClassNotFoundException | InvocationTargetException | ParseException e) {
            e.printStackTrace();
        } catch (org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }

        response.getWriter().write(arrayJson.toJSONString());
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
