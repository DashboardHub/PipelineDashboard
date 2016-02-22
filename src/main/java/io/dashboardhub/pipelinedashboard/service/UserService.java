package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.User;

public interface UserService {

    String getCurrentUsername();

    User findByCurrentUser();

    User saveByCurrentUser(User user);

    User findByUsername(String username);

    User save(User user);
}
