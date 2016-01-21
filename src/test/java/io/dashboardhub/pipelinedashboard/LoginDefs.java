package io.dashboardhub.pipelinedashboard;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class LoginDefs {

//    private WebDriver driver = new FirefoxDriver();

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() {
        FirefoxDriver driver = new FirefoxDriver();
//        this.driver.get("http://localhost:8081/logout");
    }

//    @Given("^I see (\\s+)$")
//    public boolean I_see(String text) {
//        return true;
////        this.driver.getPageSource().contains(text);
//
//    }

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() {
        System.out.format("Secure page");
    }

    @Then("^I get redirected to the login page$")
    public void I_get_redirected_to_the_login_page() {
        System.out.format("Login page");
    }
}
