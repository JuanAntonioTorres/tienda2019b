package controller;


import builders.PageBuilder;
import dao.GenericDao;
import dto.Page;
import procedures.ProceduresClient;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;

/**
 * Created by Luciano on 16/1/2019.
 */
public class PaginaController {

    public String getPage(String pageName) throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        return new PageBuilder().buildPage(new Page(pageName));
    }

}
