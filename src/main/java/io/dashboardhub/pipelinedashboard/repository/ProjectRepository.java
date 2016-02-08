package io.dashboardhub.pipelinedashboard.repository;

import io.dashboardhub.pipelinedashboard.domain.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {

    @Query("SELECT p FROM Project p JOIN p.user u WHERE p.uid = :uid AND (u.username = :username OR p.isPrivate = false)")
    Project findByUid(@Param("uid") String uid, @Param("username") String username);

    @Query("SELECT p FROM Project p WHERE p.isPrivate = false")
    Iterable<Project> findAllPublic();

    @Query("SELECT p FROM Project p JOIN p.user u WHERE u.username = :username")
    Iterable<Project> findAllByUsername(@Param("username") String username);

    @Query("SELECT p FROM Project p JOIN p.user u WHERE u.username = :username OR p.isPrivate = false")
    Iterable<Project> findAllPublicOrOwner(@Param("username") String username);
}
