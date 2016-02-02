package io.dashboardhub.pipelinedashboard.listener;

import io.dashboardhub.pipelinedashboard.domain.Login;
import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationListener implements ApplicationListener<InteractiveAuthenticationSuccessEvent> {

    @Autowired
    private UserService userService;

    @Override
    public void onApplicationEvent(final InteractiveAuthenticationSuccessEvent event) {
        User user = this.userService.findByUsername(event.getAuthentication().getName());

        if (user == null) {
            this.userService.save(new User(event.getAuthentication().getName()));
        }

        user = this.userService.findByUsername(event.getAuthentication().getName());
        user.getLogins().add(new Login());
        this.userService.save(user);
    }
}
