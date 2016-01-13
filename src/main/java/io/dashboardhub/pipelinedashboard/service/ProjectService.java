package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;
}
