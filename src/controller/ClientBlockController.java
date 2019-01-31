package controller;

import utils.TiempoDiferencia;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;

@WebServlet("/clientblock")
public class ClientBlockController extends HttpServlet {

    private static final long serialVersionUID = 1L;

    HttpSession session;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        RequestDispatcher rd = request.getRequestDispatcher("cliente/clientBlocking.jsp");


        Date fechaBloqueo = null;
        int tiempoTranscurrido = 0;
        int tiempoRestante = 0;
        fechaBloqueo = (Date) session.getAttribute("horaBloqueo");
        int tiempoMaximoBloqueo = (int) session.getAttribute("tiempoMaximoBloqueo");
        try {
            TiempoDiferencia tiempo = new TiempoDiferencia(fechaBloqueo);
            tiempoTranscurrido = (tiempo.getMinutos()*60) + tiempo.getSegundos();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        tiempoRestante =  tiempoMaximoBloqueo - tiempoTranscurrido;

        String mensaje = "";

        if (tiempoRestante < 0 ){
            mensaje = " Acabas de ser desbloquead@. " ;
            rd = request.getRequestDispatcher("index.jsp");

        }else {
            mensaje = "Estas Bloquead@ te quedan " + tiempoRestante + " segundos. ";
        }
        System.out.println("Mensaje:" + mensaje);
        request.setAttribute("mensaje", mensaje);
        rd.forward(request, response);

    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);


    }

}
