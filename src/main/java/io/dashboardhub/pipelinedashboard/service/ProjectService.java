package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Project;
import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.ProjectRepository;
import io.dashboardhub.pipelinedashboard.service.exception.PermissionDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public Iterable<Project> findAllByCurrentUser() {
        return this.projectRepository.findAllByUsername(getCurrentUsername());
    }

    public Iterable<Project> findAllByPublicOrOwner() {
        return this.projectRepository.findAllPublicOrOwner(getCurrentUsername());
    }

    public Iterable<Project> findAllByPublic() {
        return this.projectRepository.findAllPublic();
    }

    public Project findByUid(String uuid) {
        return this.projectRepository.findByUid(uuid, getCurrentUsername());
    }

    public Boolean delete(Project project) {

        if (project.getUser().getUsername().equals(getCurrentUsername())) {
            projectRepository.delete(project);

            return true;
        }

        throw new PermissionDeniedException("Permission denied");
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
