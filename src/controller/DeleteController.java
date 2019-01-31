package controller;

import dao.GenericDao;
import dto.Login;
import procedures.ProceduresClient;
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

@WebServlet("/delete")
public class DeleteController extends HttpServlet {

    private static final long serialVersionUID = 1L;
    HttpSession session;
    HttpServletRequest request;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        iniciarDatos(request, response);

        try {
            if (delete()) {
                updateMessage("The client has been successfully removed");
            } else {
                updateMessage("There was an error deleting the client");
            }
        } catch (InvocationTargetException | IllegalAccessException | ClassNotFoundException | SQLException | InstantiationException | ParseException e) {
        }

        RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
        rd.forward(request, response);

    }

    private void iniciarDatos(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        this.request = request;
        this.request.setCharacterEncoding("UTF-8");
        this.session = request.getSession();
        response.setContentType("text/html");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    private boolean delete() throws InvocationTargetException, IllegalAccessException, ClassNotFoundException, SQLException, InstantiationException, ParseException {
        Login login = new Login(request, session);
        return ((Integer) new GenericDao().execProcedure(ProceduresClient.DELETE_CLIENT.getName(), login)) > 0;
    }

    private void updateMessage(String message) {
        this.request.setAttribute("mensaje", message);
    }
}
