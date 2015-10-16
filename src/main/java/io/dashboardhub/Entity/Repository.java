package io.dashboardhub.Entity;

public class Repository {

    private String name;

    private String description;

    private String url;

    private Integer views;

    public Repository(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public Repository setName(String name) {
        this.name = name;

        return this;
    }

    public String getDescription() {
        return description;
    }

    public Repository setDescription(String description) {
        this.description = description;

        return this;
    }

    public String getUrl() {
        return url;
    }

    public Repository setUrl(String url) {
        this.url = url;

        return this;
    }

    public Integer getViews() {
        return views;
    }

    public Repository setViews(Integer views) {
        this.views = views;

        return this;
    }
}
