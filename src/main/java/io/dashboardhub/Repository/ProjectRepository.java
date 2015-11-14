package io.dashboardhub.Repository;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Entity.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@Component
public class ProjectRepository {

    // @TODO: move url to config
    private final String uri = "http://localhost:8082/project";

    @Autowired
    RestTemplate restTemplate;

    private static final Logger log = LoggerFactory.getLogger(ProjectRepository.class);

    // All my projects. Use getAllPublic for public list
    public List<Project> getAll() {
        log.error("----- GET START -----" + this.uri); // @TODO: Debug code REMOVE
//        List<Project> projects = this.restTemplate.getForObject(this.uri, List<Project>.getClass());

        ResponseEntity<List<Project>> response = restTemplate.exchange(
                this.uri, HttpMethod.GET, null, new ParameterizedTypeReference<List<Project>>() {
                }
        );
        log.error(response.getBody().toString()); // @TODO: Debug code REMOVE
        log.error("----- GET FINISHED -----"); // @TODO: Debug code REMOVE

        return response.getBody();
    }

    public List<Project> getLatest() {
        return this.generateData();
    }

    public List<Project> getPopular() {
        return this.generateData();
    }

    public Boolean save(Project project) {

        log.error("----- SAVING START -----"); // @TODO: Debug code REMOVE

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        try {
            ResponseEntity<Project> responseEntity = this.restTemplate.exchange("http://localhost:8082/project", HttpMethod.POST, entity, Project.class);
            log.error(responseEntity.toString()); // @TODO: Debug code REMOVE
        } catch(Exception e) {
            log.error(e.toString());

            return false;
        }

        log.error("----- SAVING END -----"); // @TODO: Debug code REMOVE

        return true;
    }

    // @TODO: Debug code REMOVE
    public List<Project> generateData() {
        ArrayList<Project> projects = new ArrayList<Project>();
        ArrayList<Repository> repositories = new ArrayList<Repository>();

        repositories.add(
                new Repository("repo-name1", "repo-url-1")
        );
        repositories.add(
                new Repository("repo-name2", "repo-url-2")
        );

        Project project1 = new Project("title10");
        project1.setDescription("description10");
        project1.setViews(new Random().nextInt(10000));
        project1.setRepositories(repositories);

        Project project2 = new Project("title20");
        project2.setDescription("description20");
        project2.setViews(new Random().nextInt(1000));

        Project project3 = new Project("title");
        project3.setDescription(UUID.randomUUID().toString());
        project3.setViews(new Random().nextInt(100));

        projects.add(project1);
        projects.add(project2);
        projects.add(project3);

        return projects;
    }
}
