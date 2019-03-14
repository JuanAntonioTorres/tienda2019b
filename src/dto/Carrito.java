package dto;

public class Carrito {
    private int idModelo;
    private int idCliente;
    private int cantidadPedida;
    private int actualPrecioModelo;
    private String nombreModelo;
    public Carrito() {
    }

    public int getIdModelo() {
        return idModelo;
    }

    public void setIdModelo(int idModelo) {
        this.idModelo = idModelo;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getCantidadPedida() {
        return cantidadPedida;
    }

    public void setCantidadPedida(int cantidadPedida) {
        this.cantidadPedida = cantidadPedida;
    }

    public int getActualPrecioModelo() {
        return actualPrecioModelo;
    }

    public void setActualPrecioModelo(int actualPrecioModelo) {
        this.actualPrecioModelo = actualPrecioModelo;
    }

    public String getNombreModelo() {
        return nombreModelo;
    }

    public void setNombreModelo(String nombreModelo) {
        this.nombreModelo = nombreModelo;
    }
}
