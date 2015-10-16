package io.dashboardhub.Entity;


import java.util.List;

public class Project {

    private String name;

    private String description;

    private Integer views = 0;

    private List<Repository> repositories;

    public Project(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public Project setName(String name) {
        this.name = name;

        return this;
    }

    public String getDescription() {
        return description;
    }

    public Project setDescription(String description) {
        this.description = description;

        return this;
    }

    public Integer getViews() {
        return views;
    }

    public Project setViews(Integer views) {
        this.views = views;

        return this;
    }

    public List<Repository> getRepositories() {
        return repositories;
    }

    public Project setRepositories(List<Repository> repositories) {
        this.repositories = repositories;

        return this;
    }
}
