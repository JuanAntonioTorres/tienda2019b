package dto;

import dao.GenericDao;
import procedures.ProceduresClient;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Table;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;

@Table(name = "postalCode", schema = "tienda_harnina20189vistas")
public class PostalCode {

    private String postalCode;

    public PostalCode(){
        super();
    }

    public PostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Basic
    @Column(name = "postalCode")
    public String getPostalCode() {
        return postalCode;
    }
    
    public boolean check_cp() throws SQLException, InstantiationException, IllegalAccessException, ParseException, InvocationTargetException, ClassNotFoundException {
        return ((Object)(new GenericDao().execProcedure(ProceduresClient.CHECK_CP.getName(),this))!=null);
    }

    public ArrayList<String> getCodigosPostales() throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        return (ArrayList<String>) new GenericDao().execProcedure(ProceduresClient.GET_CP.getName(),this);
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
}
