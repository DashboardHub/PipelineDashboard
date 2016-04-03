package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.history.Revision;
import org.springframework.data.history.Revisions;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public User findByCurrentUser() {
        return findByUsername(getCurrentUsername());
    }

    public User saveByCurrentUser(User user) {
        user.setUsername(getCurrentUsername());

        return save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void updateLastLoggedIn(User user) {
        User existingUser = findByUsername(user.getUsername());
        if (existingUser != null) {
            existingUser.setLastLoggedIn(user.getLastLoggedIn());
            userRepository.save(existingUser);
        }
    }

    public User save(User user) {
        User existingUser = findByUsername(user.getUsername());
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            return userRepository.save(existingUser);
        }

        return userRepository.save(user);
    }

    public Revisions<Integer, User> findRevisions(User user) {
        return userRepository.findRevisions(user.getId());
    }

    public Revision<Integer, User> findLatestRevision(User user) {
        return userRepository.findLastChangeRevision(user.getId());
    }
}

