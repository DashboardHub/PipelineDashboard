package io.dashboardhub.Service;

import io.dashboardhub.Entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class ProjectService {

    @Autowired
    private MessageSendingOperations<String> messagingTemplate;

    public List getLatest() {
        return this.generateData();
    }

    public List getPopular() {
        return this.generateData();
    }

    private List generateData() {
        ArrayList<Project> projects = new ArrayList<Project>();

        projects.add(new Project("title10", "description10").setViews(new Random().nextInt(10000)));
        projects.add(new Project("title20", "description20").setViews(new Random().nextInt(1000)));

        projects.add(new Project("title", UUID.randomUUID().toString()).setViews(new Random().nextInt(100)));

        return projects;
    }

    /**
     * @TODO: Remove once done CreateProject
     */
    @Scheduled(fixedDelay = 5000)
    public void sendLatestUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/latest", this.generateData());

    }

    /**
     * @TODO: Remove once done PopularProjects
     */
    @Scheduled(fixedDelay = 1000)
    public void sendPopularUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/popular", this.generateData());

    }
}
