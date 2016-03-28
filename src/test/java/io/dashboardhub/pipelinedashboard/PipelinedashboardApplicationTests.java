package io.dashboardhub.pipelinedashboard;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationContextLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = PipelinedashboardApplication.class, loader = SpringApplicationContextLoader.class)
@WebAppConfiguration
@IntegrationTest
@ActiveProfiles("test")
@Ignore
public abstract class PipelinedashboardApplicationTests {

    @Value("${local.server.port}")
    protected int port;

    protected String getBaseUrl() {
        return "http://localhost:" + port;
    }

    @Autowired
    protected WebDriver driver;

    protected String withBaseUrl(String path) {
        return getBaseUrl() + path;
    }
}
