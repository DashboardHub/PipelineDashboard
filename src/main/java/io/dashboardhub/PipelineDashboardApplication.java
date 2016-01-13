package io.dashboardhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class PipelineDashboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(PipelineDashboardApplication.class, args);
    }

//    @Bean
//    public RestOperations restOperations() throws Exception {
//        return new RestTemplate();
//    }
}
