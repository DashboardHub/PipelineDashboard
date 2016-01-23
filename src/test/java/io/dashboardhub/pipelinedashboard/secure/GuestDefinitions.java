package io.dashboardhub.pipelinedashboard.secure;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

public class GuestDefinitions {

    private static final String baseUrl = "http://localhost:8081";

    private WebDriver driver;

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() {
        FirefoxProfile fp = new FirefoxProfile();
        fp.setPreference("network.http.prompt-temp-redirect", false);
        driver = new FirefoxDriver();
        driver.get(baseUrl + "/logout");
    }

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() {
        driver.get(baseUrl + "/project");
    }

    @Then("^I get redirected to the login page$")
    public void I_get_redirected_to_the_login_page() {
        String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(baseUrl + "/login", currentUrl);

        driver.close();
    }
}
