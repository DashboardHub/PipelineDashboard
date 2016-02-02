package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;

public class LoginDefinitions extends PipelinedashboardApplicationTests {

    @Given("^I am logged in$")
    public void I_am_logged_in() {
        driver.get(withBaseUrl("/login"));
        driver.findElement(By.name("submit")).click();
        String username = driver.findElement(By.id("username")).getText();

        Assert.assertEquals("TestUser", username);
    }
}
