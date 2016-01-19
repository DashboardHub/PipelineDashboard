package io.dashboardhub.pipelinedashboard.controller.advice;

import io.dashboardhub.pipelinedashboard.domain.User;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.security.Principal;

@ControllerAdvice
public class CurrentUserAdvice {

    @ModelAttribute("currentUser")
    public User getCurrentUser(Principal principal) {

        if (principal == null) {
            return new User(null);
        }

        return new User(principal.getName());
    }
}
