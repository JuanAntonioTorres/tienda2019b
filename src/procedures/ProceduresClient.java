package procedures;

public enum ProceduresClient {
    GET_CLIENTE_lOGIN("getClienteLogin"),
    GET_LISTA_CLIENTES("getListaClientes"),
    GET_ID_LOGIN("getIdLogin"),
    GET_CP("get_cp"),
    GET_CLIENTE("getCliente"),
    INSERT_CLIENT("insertClient"),
    UPDATE_LOGIN("updateLogin"),
    UPDATE_CLIENT_DAPER("updateClientDaper"),
    DELETE_CLIENT("deleteClient"),
    CHECK_CP("check_cp"),
    BLOCK_CLIENT("blockClient"),
    GET_EMAIL("getEmail"),
    GET_CLAVE("getClave"),
    IS_LOCKED("isLocked"),
    UNLOCK_CLIENT("unblockClient");

    private final String name;

    ProceduresClient(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

}
