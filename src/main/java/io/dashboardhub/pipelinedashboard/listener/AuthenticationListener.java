package io.dashboardhub.pipelinedashboard.listener;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class AuthenticationListener implements ApplicationListener<InteractiveAuthenticationSuccessEvent> {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Override
    public void onApplicationEvent(final InteractiveAuthenticationSuccessEvent event) {
        User user = userServiceImpl.findByUsername(event.getAuthentication().getName());

        if (user == null) {
            userServiceImpl.save(new User(event.getAuthentication().getName()));
        }

        user = userServiceImpl.findByUsername(event.getAuthentication().getName());
        user.setLastLoggedIn(new Date().toString());
        userServiceImpl.save(user);
    }
}
