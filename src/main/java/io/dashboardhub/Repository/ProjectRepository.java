package io.dashboardhub.Repository;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Entity.Repository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
public class ProjectRepository {

    public List<Project> getLatest() {
        return this.generateData();
    }

    public List<Project> getPopular() {
        return this.generateData();
    }


    public List<Project> generateData() {
        try { Thread.sleep(10000); } catch(Exception e) {}

        ArrayList<Project> projects = new ArrayList<Project>();
        ArrayList<Repository> repositories = new ArrayList<Repository>();

        repositories.add(
                new Repository("repo-name1", "repo-url-1")
        );
        repositories.add(
                new Repository("repo-name2", "repo-url-2")
        );

        projects.add(
                new Project("title10", "description10")
                        .setViews(new Random().nextInt(10000))
                        .setRepositories(repositories)
        );
        projects.add(new Project("title20", "description20").setViews(new Random().nextInt(1000)));

        projects.add(new Project("title", UUID.randomUUID().toString()).setViews(new Random().nextInt(100)));

        return projects;
    }
}
