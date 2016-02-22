package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public final class GuestDefinitions extends PipelinedashboardApplicationTests {

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() {
        try {
            driver.findElement(By.id("logout")).submit();
        } catch (org.openqa.selenium.NoSuchElementException e) {
        }
        driver.get(withBaseUrl("/"));
        Assert.assertEquals("Welcome Guest, please Login", driver.findElement(By.id("login")).getText());
    }

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() {
        driver.get(withBaseUrl("/project"));
    }
}
