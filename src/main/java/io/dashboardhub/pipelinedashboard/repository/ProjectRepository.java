package io.dashboardhub.pipelinedashboard.repository;

import io.dashboardhub.pipelinedashboard.domain.Project;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {

    Project findByUid(@Param("uid") String uid);
}
