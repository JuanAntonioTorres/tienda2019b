package utils;

/**
 * Created by Luciano on 04/02/2018.
 */
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TiempoDiferencia {

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd H:m:s");
    Date fechaInicial;
    long yourmilliseconds = System.currentTimeMillis();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd H:m:s");
    Date resultdate = new Date(yourmilliseconds);
    Date fechaFinal = dateFormat.parse(sdf.format(resultdate));
    int diferencia;
    int dias, horas, minutos=0, segundos=0;

    public TiempoDiferencia(Date fechaBloqueo) throws ParseException {

        String fechaComoCadena = sdf.format(fechaBloqueo);
        fechaInicial = dateFormat.parse(String.valueOf(fechaComoCadena));   //"2018-02-04 16:00:00");
        diferencia = (int) ((fechaFinal.getTime()-fechaInicial.getTime())/1000);
        //System.out.println(sdf.format(resultdate));
        if(diferencia>86400) {
            dias=(int)Math.floor(diferencia/86400);
            diferencia=diferencia-(dias*86400);
        }
        if(diferencia>3600) {
            horas=(int)Math.floor(diferencia/3600);
            diferencia=diferencia-(horas*3600);
        }
        if(diferencia>60) {
            minutos=(int)Math.floor(diferencia/60);
            segundos=diferencia-(minutos*60);
        }
    }

    public int getDias(){
        return dias;
    }
    public int getHoras(){
        return horas;
    }
    public int getMinutos(){
        return minutos;
    }
    public int getSegundos(){
        return segundos;
    }



}
