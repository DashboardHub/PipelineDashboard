package io.dashboardhub.pipelinedashboard.secure;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;

public class GuestDefinitions extends PipelinedashboardApplicationTests {

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() {
        driver.get(withBaseUrl("/logout"));
    }

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() {
        driver.get(withBaseUrl("/project"));
    }

    @Then("^I get redirected to the login page$")
    public void I_get_redirected_to_the_login_page() {
        Assert.assertEquals(withBaseUrl("/login"), driver.getCurrentUrl());
        driver.close();
    }
}
