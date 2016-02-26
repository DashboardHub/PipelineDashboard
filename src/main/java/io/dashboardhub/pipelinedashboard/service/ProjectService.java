package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Project;

public interface ProjectService {

    Iterable<Project> findAllByCurrentUser();

    Iterable<Project> findAllByPublicOrOwner();

    Iterable<Project> findAllByPublic();

    Iterable<Project> findAllByPublicRecent();

    Project findByUid(String uuid);

    void delete(Project project);

    Project save(Project project);
}
