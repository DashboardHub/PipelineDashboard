package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Project;
import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.ProjectRepository;
import io.dashboardhub.pipelinedashboard.service.exception.PermissionDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserServiceImpl userServiceImpl;

    public Iterable<Project> findAllByCurrentUser() {
        return this.projectRepository.findAllByUsername(userServiceImpl.getCurrentUsername());
    }

    public Iterable<Project> findAllByPublicOrOwner() {
        return this.projectRepository.findAllPublicOrOwner(userServiceImpl.getCurrentUsername());
    }

    public Iterable<Project> findAllByPublic() {
        return this.projectRepository.findAllPublic();
    }

    public Project findByUid(String uuid) {
        return this.projectRepository.findByUid(uuid, userServiceImpl.getCurrentUsername());
    }

    public void delete(Project project) {
        if (!project.getUser().getUsername().equals(userServiceImpl.getCurrentUsername())) {
            throw new PermissionDeniedException("Permission denied");
        }

        projectRepository.delete(project);
    }

    public Project save(Project project) {
        User user = userServiceImpl.findByCurrentUser();

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
