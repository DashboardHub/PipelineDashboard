package io.dashboardhub.pipelinedashboard.listener;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;

@Component
public final class AuthenticationListener implements ApplicationListener<InteractiveAuthenticationSuccessEvent> {

    @Autowired
    private UserService userService;

    @Override
    public void onApplicationEvent(final InteractiveAuthenticationSuccessEvent event) {
        User user = userService.findByUsername(event.getAuthentication().getName());

        if (user == null) {
            user = userService.save(new User(event.getAuthentication().getName()));
        }

        user.setLastLoggedIn(ZonedDateTime.now());
        userService.updateLastLoggedIn(user);
    }
}
