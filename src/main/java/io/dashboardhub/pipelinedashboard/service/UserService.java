package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByCurrentUsername() {
        return this.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
