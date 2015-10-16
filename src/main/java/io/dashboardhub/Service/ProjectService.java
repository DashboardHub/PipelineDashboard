package io.dashboardhub.Service;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.Future;

@Service
public class ProjectService {

    @Autowired
    private MessageSendingOperations<String> messagingTemplate;

    @Autowired
    private ProjectRepository projectRepository;

    @Async("taskExecutor")
    public Future<List<Project>> getLatest() {
        return new AsyncResult<List<Project>>(this.projectRepository.getLatest());
    }

    @Async("taskExecutor")
    public Future<List<Project>> getPopular() {
        return new AsyncResult<List<Project>>(this.projectRepository.getPopular());
    }

    /**
     * @TODO: Remove once done CreateProject
     */
    @Scheduled(fixedDelay = 5000)
    public void sendLatestUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/latest", projectRepository.generateData());

    }

    /**
     * @TODO: Remove once done PopularProjects
     */
    @Scheduled(fixedDelay = 1000)
    public void sendPopularUpdates() {
        this.messagingTemplate.convertAndSend(
                "/project/popular", projectRepository.generateData());
    }
}
