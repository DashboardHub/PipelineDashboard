package io.dashboardhub.pipelinedashboard.repository;

import io.dashboardhub.pipelinedashboard.domain.Login;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends PagingAndSortingRepository<Login, Long> {
}
