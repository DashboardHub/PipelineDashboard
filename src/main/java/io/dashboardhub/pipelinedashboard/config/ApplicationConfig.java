package io.dashboardhub.pipelinedashboard.config;

import io.dashboardhub.pipelinedashboard.service.CurrentTimeDateTimeServiceImpl;
import io.dashboardhub.pipelinedashboard.service.DateTimeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public DateTimeService currentTimeDateTimeService() {
        return new CurrentTimeDateTimeServiceImpl();
    }
}
