package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Project;
import io.dashboardhub.pipelinedashboard.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    // @ToDo: should be find by owner - when joined to user
    public Iterable<Project> findAll() {
        return this.projectRepository.findAll();
    }

    public Project findByUid(String uuid) {
        return this.projectRepository.findByUid(uuid);
    }

    public Boolean delete(Project project) {
        projectRepository.delete(project);

        return true;
    }

    // @ToDo: should be saved by logged in user
    public Project save(Project project) {
        Project existingProject = this.findByUid(project.getUid());
        if (existingProject != null) {
            existingProject.setName(project.getName());
            existingProject.setDescription(project.getDescription());
            existingProject.setIsPrivate(project.getIsPrivate());

            return this.projectRepository.save(existingProject);
        }

        return this.projectRepository.save(project);
    }
}
