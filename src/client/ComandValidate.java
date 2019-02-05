package client;

import error.Error;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;

public interface ComandValidate {
    HashMap<String,Error> useCommands() throws SQLException, ClassNotFoundException, InvocationTargetException, InstantiationException, ParseException, IllegalAccessException;
}
