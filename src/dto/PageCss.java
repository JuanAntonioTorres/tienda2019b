package dto;

public class PageCss {
    private String path;
    private String name;

    public PageCss() {
    }

    public PageCss(String path, String name) {
        this.path = path;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
