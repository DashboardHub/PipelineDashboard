package io.dashboardhub.pipelinedashboard;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class LoginDefs {

    private String baseUrl = "http://localhost:8081";

    private WebDriver driver = new FirefoxDriver();

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() {
        this.driver.get(this.baseUrl + "/logout");
    }

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() {
        this.driver.navigate().to(this.baseUrl + "/project");
    }

    @Then("^I get redirected to the login page$")
    public void I_get_redirected_to_the_login_page() {
        String currentUrl = this.driver.getCurrentUrl();

        Assert.assertEquals(this.baseUrl + "/login", currentUrl);

        this.driver.close();
    }
}
