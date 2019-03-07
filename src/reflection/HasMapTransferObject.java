package reflection;

import utils.SetterHelper;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;

public class HasMapTransferObject {

   public Object crearPojo(HashMap<String, Object> datosFila, String clasePojo) throws ClassNotFoundException, IllegalAccessException, InstantiationException, InvocationTargetException, ParseException {

        Object genericObject = Class.forName(clasePojo).newInstance();

        Method[] metodosDeclarados = genericObject.getClass().getDeclaredMethods();

        Field[] atributos = genericObject.getClass().getDeclaredFields();

        for (int i = 0; i < metodosDeclarados.length; i++) {
            for (int j = 0; j < atributos.length; j++) {
                if (metodosDeclarados[i].getName().toLowerCase().contains("set" + atributos[j].getName().toLowerCase())) {
                    new SetterHelper().ejecutarSet(datosFila.get(atributos[j].getName().toLowerCase()), genericObject, metodosDeclarados[i]);
                }
            }
        }
        return genericObject;
    }



}
