package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public User findByCurrentUser() {
        return this.findByUsername(getCurrentUsername());
    }

    public User saveByCurrentUser(User user) {
        user.setUsername(getCurrentUsername());

        return this.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        User existingUser = findByUsername(user.getUsername());
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setLastLoggedIn(user.getLastLoggedIn());

            return userRepository.save(existingUser);
        }

        return userRepository.save(user);
    }
}

