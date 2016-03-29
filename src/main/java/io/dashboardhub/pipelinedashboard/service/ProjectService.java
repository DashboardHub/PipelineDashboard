package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Project;

import java.util.UUID;

public interface ProjectService {

    Iterable<Project> findAllByCurrentUser();

    Iterable<Project> findAllByPublicOrOwner();

    Iterable<Project> findAllByPublic();

    Project findByUid(String uuid);

    void delete(Project project);

    Project save(Project project);
}
