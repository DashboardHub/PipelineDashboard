package io.dashboardhub.pipelinedashboard.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationListener implements ApplicationListener<InteractiveAuthenticationSuccessEvent> {

    @Override
    public void onApplicationEvent(final InteractiveAuthenticationSuccessEvent event) {
        System.out.println("+++++++ ================ ------------");
    }

}
