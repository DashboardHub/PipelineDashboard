package io.dashboardhub.pipelinedashboard.controller.advice;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.security.Principal;

@ControllerAdvice
public class CurrentUserAdvice {

    @Autowired
    UserServiceImpl userServiceImpl;

    @ModelAttribute("currentUser")
    public User getCurrentUser(Principal principal) {

        if (principal == null) {
            return new User(null);
        }

        return userServiceImpl.findByCurrentUser();
    }
}
