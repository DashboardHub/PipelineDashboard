package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.history.Revisions;

public interface UserService {

    String getCurrentUsername();

    User findByCurrentUser();

    User saveByCurrentUser(User user);

    User findByUsername(String username);

    User save(User user);

    void updateLastLoggedIn(User user);

    Revisions<Integer, User> findRevisions(User user);
}
