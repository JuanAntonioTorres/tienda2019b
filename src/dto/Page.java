package dto;

import java.util.List;

public class Page implements IPaginaDao {

    private String pageName;
    private String title;
    private String metaAll;
    private String linkAll;
    private List<PageCss> cssAll;
    private String body;
    private List<PageCss> jsAll;

    public Page(String pageName) {
        this.pageName = pageName;
    }
    //constructor para reflection
    public Page() {
    }
    //reflection
    public String getPageName() {
        return pageName;
    }
    //reflection
    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    @Override
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String getMetaAll() {
        return metaAll;
    }

    public void setMetaAll(String metaAll) {
        this.metaAll = metaAll;
    }

    @Override
    public String getLinkAll() {
        return linkAll;
    }

    public void setLinkAll(String linkAll) {
        this.linkAll = linkAll;
    }

    @Override
    public List<PageCss> getCssAll() {
        return cssAll;
    }

    public void setCssAll(List<PageCss> cssAll) {
        this.cssAll = cssAll;
    }

    @Override
    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public List<PageCss> getJsAll() {
        return jsAll;
    }

    public void setJsAll(List<PageCss> jsAll) {
        this.jsAll = jsAll;
    }
}
