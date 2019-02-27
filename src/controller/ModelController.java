package controller;

import dao.GenericDao;
import dto.PhoneModel;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import procedures.ProceduresProductos;
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

@WebServlet("/getProductos")
public class ModelController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    HttpSession session;
    JSONObject oneJson;
    JSONArray arrayJson = new JSONArray();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        session = request.getSession();
        response.setCharacterEncoding("UTF-8");
        ArrayList<PhoneModel> listaModels = null;
        try {
            listaModels = (ArrayList<PhoneModel>) new GenericDao().execProcedure(ProceduresProductos.GET_MODELOS.getName(),new PhoneModel());
            listaModels.forEach(modeloEntity -> {
                oneJson = new JSONObject();
                oneJson.put("IdModelo",modeloEntity.getIdModelo());
                oneJson.put("nombreModelo", modeloEntity.getNombreModelo());
                oneJson.put("RefModelo",modeloEntity.getRefModelo());
                oneJson.put("actualPrecioModelo", modeloEntity.getActualPrecioModelo());
                oneJson.put("stockActualModelo",modeloEntity.getStockActualModelo());
                oneJson.put("nombreModelo", modeloEntity.getNombreModelo());
                oneJson.put("descripcionModelo",modeloEntity.getDescripcionModelo());
                oneJson.put("marca", modeloEntity.getMarca());
                oneJson.put("imagen", modeloEntity.getImagen());
                arrayJson.add(oneJson);

            });
        } catch (SQLException | InstantiationException | IllegalAccessException | ClassNotFoundException | InvocationTargetException | ParseException e) {
            e.printStackTrace();
        }

        response.getWriter().write(arrayJson.toJSONString());
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
