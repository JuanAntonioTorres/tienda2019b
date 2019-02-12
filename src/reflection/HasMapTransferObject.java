package reflection;


import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;

public class HasMapTransferObject {

    public Object crearPojo(HashMap<String, Object> datosFila, String clasePojo) throws ClassNotFoundException, IllegalAccessException, InstantiationException, InvocationTargetException, ParseException {

        Class genericClass = Class.forName(clasePojo);

        Object genericObject = genericClass.newInstance();

        Method[] metodosDeclarados = genericObject.getClass().getDeclaredMethods();

        Field[] atributos = genericObject.getClass().getDeclaredFields();

        for (int i = 0; i < metodosDeclarados.length; i++) {

            for (int j = 0; j < atributos.length; j++) {

                if (metodosDeclarados[i].getName().toLowerCase().contains("set" + atributos[j].getName().toLowerCase())) {

                    try {
                        metodosDeclarados[i].invoke(genericObject, datosFila.get(atributos[j].getName().toLowerCase())); //.toString()));
                    }catch (IllegalArgumentException e){
                        SimpleDateFormat simpleFormat = new SimpleDateFormat("dd/MM/yyyy");
                        String dateFormat = simpleFormat.format(datosFila.get(atributos[j].getName().toLowerCase()));
                        metodosDeclarados[i].invoke(genericObject,dateFormat);
                    }

                }

            }

        }
        return genericObject;
    }

}
