package io.dashboardhub.Service;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private MessageSendingOperations<String> messagingTemplate;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getLatest() {
        return this.projectRepository.getLatest();
    }

    public List<Project> getAll() {
        return this.projectRepository.getAll();
    }

    public List<Project> getPopular() {
        return this.projectRepository.getPopular();
    }

    public Boolean save(Project project) {
        return this.projectRepository.save(project);
    }

    @Scheduled(fixedDelay = 5000)
    public void sendLatestUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/latest", this.projectRepository.generateData());

    }

    @Scheduled(fixedDelay = 1000)
    public void sendPopularUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/popular", this.projectRepository.generateData());
    }
}
