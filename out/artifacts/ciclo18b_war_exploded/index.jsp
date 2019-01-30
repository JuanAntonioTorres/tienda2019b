<%@ page import="controller.PaginaController" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%String miPagina= new PaginaController().getPage("index");%>
<%=miPagina%>

