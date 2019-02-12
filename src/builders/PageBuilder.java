package builders;

import dao.GenericDao;
import dto.Page;
import dto.PageCss;
import procedures.ProceduresPage;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

public class PageBuilder {

    public PageBuilder() {
    }

    public String buildPage(String pageName) throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        Page page = new Page(pageName);
        fillPageDataFromDB(page);
        StringBuilder domBuilding = new StringBuilder();
        domBuilding.append("<HTML>");
        domBuilding.append(getHead(page));
        domBuilding.append(getBody(page));
        domBuilding.append("</HTML>");
        domBuilding.append(getJs(page));
        return new String(domBuilding);
    }

    private void fillPageDataFromDB(Page page) throws IllegalAccessException, ParseException, InstantiationException, SQLException, InvocationTargetException, ClassNotFoundException {
        GenericDao genericDao = new GenericDao();
        page.setTitle((String) genericDao.execProcedure(ProceduresPage.GET_TITLE.getName(), page));
        page.setMetaAll((String) genericDao.execProcedure(ProceduresPage.GET_METAALL.getName(), page));
        page.setCssAll((List<PageCss>) genericDao.execProcedure(ProceduresPage.GET_CSSALL.getName(), new PageCss(), page));
        page.setLinkAll((String) genericDao.execProcedure(ProceduresPage.GET_LINKALL.getName(), page));
        page.setBody((String) genericDao.execProcedure(ProceduresPage.GET_BODY.getName(), page));
        page.setJsAll((List<PageCss>) genericDao.execProcedure(ProceduresPage.GET_JSALL.getName(), new PageCss(), page));
    }

    private String getHead(Page page) {
        String head = "<head>";
        head += "<title>" + page.getTitle() + "</title>";
        head += page.getMetaAll();
        head += page.getLinkAll();
        head += "</head>";
        List<PageCss> cssAll = page.getCssAll();
        for (PageCss css : cssAll) {
            head += "<link rel='stylesheet' href='" + css.getPath() + "/" + css.getName() + ".css'>";
        }
        return head;
    }

    private String getBody(Page page) {
        return page.getBody();
    }

    private String getJs(Page page) {

        String js = "";
        List<PageCss> jsAll = page.getJsAll();
        for (PageCss jss : jsAll) {
            js += "<script src ='" + "../" + jss.getPath() + "/" + jss.getName() + ".js'></script>";
        }
        return js;

    }


}


//BEGIN
//        DECLARE fatheraux int DEFAULT 0;
//        DECLARE contiaux int DEFAULT 0;
//        DECLARE draweraux int DEFAULT 0;
//        DECLARE drawerynaux int DEFAULT 0;
//        DECLARE drawerynaux int DEFAULT 0;
//        DECLARE ramas int DEFAULT 1;
//
//        DECLARE meLevel int;
//        DECLARE meOrder int;
//        DECLARE meFather int;
//        DECLARE meDrawer int DEFAULT 0;
//        DECLARE meVisit int;
//        DECLARE meConti int DEFAULT 0;
//        DECLARE meDraweryn int;
//
//        DECLARE etiqueta VARCHAR(20000)  DEFAULT "";
//
//
//        DECLARE cursor_body CURSOR FOR SELECT pagina.body.hierarchicalLevel,pagina.body.orderDrawer, pagina.body.fatherDrawer, pagina.body.IdDrawer,pagina.body.visited, pagina.body.idContinent, pagina.body.draweryn FROM pagina.body WHERE pagina.body.finished = 0 and pagina.body.fatherDrawer = fatheraux ORDER BY 1,2;
//
//        DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE;
//
//        DELETE FROM pagina.body;
//        SET page = (SELECT pagina.page.codePage FROM pagina.page WHERE pagina.page.pageName = pageName);
//
//        INSERT INTO pagina.body (pagina.body.hierarchicalLevel, pagina.body.orderDrawer, pagina.body.fatherDrawer, pagina.body.IdDrawer,  pagina.body.idContinent) SELECT a.hierarchicalLevel, a.orderDrawer, a.fatherDrawer, a.idDrawer, a.idContinent
//        FROM pagina.continent a, pagina.continent b
//        WHERE (a.fatherDrawer = b.idContinent or a.fatherDrawer= 0) AND a.idPage = page
//        GROUP BY  a.hierarchicalLevel,  a.orderDrawer, a.idDrawer, a.idContinent;
//
//        INSERT INTO pagina.body(pagina.body.hierarchicalLevel, pagina.body.orderDrawer, pagina.body.fatherDrawer, pagina.body.IdDrawer,  pagina.body.idContinent,pagina.body.draweryn) SELECT a.hierarchicalLevel + 1, b.OrderComponent, b.IdContinent, b.IdComponent, (1000 + b.IdContinent + b.OrderComponent), 0
//        FROM pagina.continent a, pagina.content b
//        WHERE a.idContinent = b.IdContinent AND a.idPage = page;
//
//        SET body = "<body>";
//
//        SET ramas = (select COUNT(*) from pagina.body where pagina.body.finished = 0);
//
//        WHILE ramas > 0 DO
//        OPEN cursor_body;
//        SET @hecho = FALSE;
//        FETCH cursor_body INTO meLevel, meOrder, meFather, meDrawer, meVisit, meConti, meDraweryn;
//        IF @hecho THEN  UPDATE pagina.body SET pagina.body.finished= 1 WHERE pagina.body.idContinent= contiaux;
//        IF drawerynaux = 1 THEN SET etiqueta = (SELECT pagina.drawer.drawerFinish FROM pagina.drawer
//        WHERE pagina.IdDrawer = draweraux);
//        END IF;
//        SET fatheraux  = 0;
//        ELSE  SET contiaux = meConti;
//        SET draweraux = meDrawer;
//        SET fatheraux  = meConti;
//        SET drawerynaux = meDraweryn;
//        IF  meVisit = 0 THEN UPDATE pagina.body SET pagina.body.visited= 1 WHERE pagina.body.idContinent= meConti;
//        IF meDraweryn = 0 THEN  UPDATE pagina.body SET pagina.body.finished= 1 WHERE pagina.body.idContinent= meConti;
//        SET etiqueta =  (SELECT pagina.component.component FROM pagina.component WHERE pagina.component.idComponent = meDrawer);
//        SET fatheraux = 0;
//        ELSE
//        SET etiqueta =  (SELECT pagina.drawer.drawerStar FROM pagina.drawer WHERE pagina.drawer.IdDrawer =  meDrawer);
//        END IF;
//
//        ELSE SET etiqueta = "";
//        END IF;
//
//        END IF;
//        SET body = concat(body, etiqueta);
//        CLOSE cursor_body;
//        SET ramas  = (select COUNT(*) from pagina.body where pagina.body.finished = 0);
//
//        END WHILE;
//
//        SET body = concat(body, "</body>");
//
//
//        END

