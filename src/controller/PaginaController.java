package controller;

import builders.PageBuilder;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;

public class PaginaController {

    public PaginaController() {
    }

    public String getPage(String pageName) throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        return new PageBuilder().buildPage(pageName);
    }

}
