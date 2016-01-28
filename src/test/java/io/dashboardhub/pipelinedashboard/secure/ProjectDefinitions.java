package io.dashboardhub.pipelinedashboard.secure;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class ProjectDefinitions {

    final private String baseUrl = "http://localhost:8082";

    private WebDriver driver = new FirefoxDriver();

    @Given("^I am logged in$")
    public void I_am_logged_in() throws Exception {
        this.driver.get(this.baseUrl + "/login");
        this.driver.findElement(By.name("submit")).click();
        String username = this.driver.findElement(By.id("username")).getText();

        Assert.assertEquals("TestUser", username);
    }

    @When("^I try to access the project page$")
    public void I_try_to_access_the_project_page() throws Exception {
        this.driver.get(this.baseUrl + "/project");
    }

    @Then("^I get the project page$")
    public void I_get_the_project_page() throws Exception {
        String currentUrl = this.driver.getCurrentUrl();

        Assert.assertEquals(this.baseUrl + "/project", currentUrl);

        this.driver.close();
    }
}
