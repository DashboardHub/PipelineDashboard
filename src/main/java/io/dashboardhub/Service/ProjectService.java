package io.dashboardhub.Service;

import io.dashboardhub.Entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    @Autowired
    private MessageSendingOperations<String> messagingTemplate;

    public List getLatest() {
        ArrayList<Project> projects = new ArrayList<Project>();

        projects.add(new Project("title1", "description1"));
        projects.add(new Project("title2", "description2"));

        projects.add(new Project("title3", UUID.randomUUID().toString()));

        return projects;
    }

    /**
     * @TODO: Remove once done CreateProject
     */
    @Scheduled(fixedDelay = 5000)
    public void sendDataUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/new", new Project("title", UUID.randomUUID().toString()));

    }
}
