package io.dashboardhub.pipelinedashboard;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty"})
@Configuration
public class RunCukesTest {

    @Bean
    protected WebDriver getDriver() {
        return new FirefoxDriver();
    }
}
