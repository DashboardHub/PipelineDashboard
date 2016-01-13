package io.dashboardhub.pipelinedashboard;

import io.dashboardhub.pipelinedashboard.listener.AuthenticationListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;

@EnableOAuth2Sso
@SpringBootApplication
public class PipelinedashboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(PipelinedashboardApplication.class, args);
	}

	@Bean
	public AuthenticationListener authenticationListener() {
		return new AuthenticationListener();
	}
}
