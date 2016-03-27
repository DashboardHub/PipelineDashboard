package io.dashboardhub.pipelinedashboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class ApplicationConfig {

//    @Profile("!test")
    @Bean
    public DateTimeService currentTimeDateTimeService() {
        return new CurrentTimeDateTimeService();
    }
}
