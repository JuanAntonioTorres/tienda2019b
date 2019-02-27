package dto;

public class PhoneModel {
    private int idModelo;
    private String nombreModelo;
    private String refModelo;
    private double actualPrecioModelo;
    private int stockActualModelo;
    private String descripcionModelo;
    private String marca;
    private String rutaImagen;

    public int getIdModelo() {
        return idModelo;
    }

    public void setIdModelo(int idModelo) {
        this.idModelo = idModelo;
    }

    public String getNombreModelo() {
        return nombreModelo;
    }

    public void setNombreModelo(String nombreModelo) {
        this.nombreModelo = nombreModelo;
    }

    public String getRefModelo() {
        return refModelo;
    }

    public void setRefModelo(String refModelo) {
        this.refModelo = refModelo;
    }

    public double getActualPrecioModelo() {
        return actualPrecioModelo;
    }

    public void setActualPrecioModelo(double actualPrecioModelo) {
        this.actualPrecioModelo = actualPrecioModelo;
    }

    public int getStockActualModelo() {
        return stockActualModelo;
    }

    public void setStockActualModelo(int stockActualModelo) {
        this.stockActualModelo = stockActualModelo;
    }

    public String getDescripcionModelo() {
        return descripcionModelo;
    }

    public void setDescripcionModelo(String descripcionModelo) {
        this.descripcionModelo = descripcionModelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getRutaImagen() {
        return rutaImagen;
    }

    public void setRutaImagenmagen(String imagen) {
        this.rutaImagen = imagen;
    }

}