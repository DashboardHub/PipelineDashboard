package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Project;
import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.ProjectRepository;
import io.dashboardhub.pipelinedashboard.service.exception.PermissionDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    public Iterable<Project> findAllByCurrentUser() {
        return projectRepository.findAllByUsername(userService.getCurrentUsername());
    }

    public Iterable<Project> findAllByPublicOrOwner() {
        return projectRepository.findAllPublicOrOwner(userService.getCurrentUsername());
    }

    public Iterable<Project> findAllByPublic() {
        return projectRepository.findAllPublic();
    }

    public Project findByUid(String uuid) {
        return projectRepository.findByUid(uuid, userService.getCurrentUsername());
    }

    public void delete(Project project) {
        if (!project.getUser().getUsername().equals(userService.getCurrentUsername())) {
            throw new PermissionDeniedException("Permission denied");
        }

        projectRepository.delete(project);
    }

    public Project save(Project project) {
        User user = userService.findByCurrentUser();

        Project existingProject = findByUid(project.getUid());
        if (existingProject != null) {
            if (existingProject.getUser() != user) {
                throw new PermissionDeniedException("Not owner of Project");
            }

            existingProject.setName(project.getName());
            existingProject.setDescription(project.getDescription());
            existingProject.setIsPrivate(project.getIsPrivate());

            return projectRepository.save(existingProject);
        }

        project.setUser(user);

        return projectRepository.save(project);
    }
}
