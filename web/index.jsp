<%@ page import="controller.PaginaController" %>
<%@ page import="dto.PersonalData" %>
<%@ page import="dao.GenericDao" %>
<%@ page import="procedures.ProceduresClient" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    session = request.getSession();
    String miPagina = null;
    if(session.getAttribute("pageName") == null){
        session.setAttribute("pageName", "index");
        session.setAttribute("idSesion", session.getId());
        session.setAttribute("intento",0);
    }
    if(session.getAttribute("idSesion") == session.getId())
    {
        miPagina = new PaginaController().getPage(String.valueOf(session.getAttribute("pageName")));
    }
%>
<%=miPagina%>
