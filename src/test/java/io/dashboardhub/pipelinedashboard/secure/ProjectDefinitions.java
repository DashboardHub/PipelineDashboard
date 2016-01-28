package io.dashboardhub.pipelinedashboard.secure;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;

public class ProjectDefinitions extends PipelinedashboardApplicationTests {

    @Given("^I am logged in$")
    public void I_am_logged_in() {
        driver.get(withBaseUrl("/login"));
        driver.findElement(By.name("submit")).click();
        String username = driver.findElement(By.id("username")).getText();

        Assert.assertEquals("TestUser", username);
    }

    @When("^I try to access the project page$")
    public void I_try_to_access_the_project_page() {
        driver.get(withBaseUrl("/project"));
    }

    @Then("^I get the project page$")
    public void I_get_the_project_page() throws Exception {
        Assert.assertEquals(withBaseUrl("/project"), driver.getCurrentUrl());
        driver.close();
    }
}
