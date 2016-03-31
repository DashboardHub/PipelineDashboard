package io.dashboardhub.pipelinedashboard.config;

import io.dashboardhub.pipelinedashboard.auditor.UsernameAuditor;
import io.dashboardhub.pipelinedashboard.provider.AuditingDateTimeProvider;
import io.dashboardhub.pipelinedashboard.service.DateTimeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider", dateTimeProviderRef = "dateTimeProvider")
@EnableJpaRepositories(basePackages = "io.dashboardhub.pipelinedashboard.repository", repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
public class PersistenceConfig {

    @Bean
    DateTimeProvider dateTimeProvider(DateTimeService dateTimeService) {
        return new AuditingDateTimeProvider(dateTimeService);
    }

    @Bean
    AuditorAware<String> auditorProvider() {
        return new UsernameAuditor();
    }
}
