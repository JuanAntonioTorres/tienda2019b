package test;

import dao.GenericDao;
import dto.PersonalData;
import procedures.ProceduresClient;
import reflection.HasMapTransferObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;

public class testRStransferObject {

    public static void main (String [] args) throws ClassNotFoundException, InvocationTargetException, InstantiationException, ParseException, IllegalAccessException, SQLException {
        Object valorObjeto = 1;

        //Class clase = int.class;
        //metodoQuePideInt((clase)valorObjeto);

        int valorInt = (int) valorObjeto;
        System.out.println(valorInt);
        metodoQuePideInt((int)valorObjeto);
        for (int i = 0; i < PersonalData.class.getDeclaredMethods().length ; i++) {
            Method metodo = PersonalData.class.getDeclaredMethods()[i];
            for (int k = 0; k < metodo.getParameters().length; k++) {
                System.out.println(metodo.getParameters()[k].getType());
            }
        }
        System.out.println(float.class);
        System.out.println(Date.class);
        System.out.println(long.class);
    }

    private static void metodoQuePideInt(int numeroInt){
        System.out.println("no me pases Object");
    }

}
