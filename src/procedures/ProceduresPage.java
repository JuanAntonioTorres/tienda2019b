package procedures;

public enum ProceduresPage {
    GET_TITLE("getTitle"),
    GET_CSSALL("getCssAll"),
    GET_BODY("getBody"),
    GET_LINKALL("getLinkAll"),
    GET_METAALL("getMetaAll"),
    GET_JSALL("getJsAll");

    private final String name;

    ProceduresPage(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

}


//CODIGO PARA CREAR VISTAS
//CREATE VIEW jspageview as SELECT pagina.page.pageName
// as pageName, pagina.filejs.pathFileJs as
// path,pagina.filejs.fileJs,pagina.pagejs.orderFileJs
// FROM pagina.page,pagina.pagejs,pagina.filejs
// WHERE pagina.filejs.idFileJs = pagina.pagejs.IdFileJs
// AND pagina.page.codePage = pagina.pagejs.idPage