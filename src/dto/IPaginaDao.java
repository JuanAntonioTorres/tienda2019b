package dto;

import java.util.List;

public interface IPaginaDao<T> {

    String getTitle();

    String getMetaAll();

    String getLinkAll();

    List<PageCss> getCssAll();

    String getBody();

    List<PageCss> getJsAll();

}
