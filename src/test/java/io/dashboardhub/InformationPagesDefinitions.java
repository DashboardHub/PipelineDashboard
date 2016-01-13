package io.dashboardhub;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import cucumber.api.java8.En;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.boot.test.IntegrationTest;
import org.openqa.selenium.WebDriver;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@IntegrationTest
public class InformationPagesDefinitions implements En {

    public WebDriver driver = new FirefoxDriver();

    private String host = "http://localhost:80";

    @Given("^I am a visitor$")
    public void IAmAVistor() {

    }

    @When("^I view the \"([^\"]*)\" page$")
    public void IViewThePage(String page) throws Throwable {
        driver.get(host + page);
    }

    @Then("^I should see \"([^\"]*)\" in the title$")
    public void IShouldSeeInTheTitle(String text) throws Throwable {
        assertEquals(text, driver.getTitle());
    }

    @Then("^I should see \"([^\"]*)\" in the url")
    public void IShouldSeeInTheUrl(String text) throws Throwable {
        assertTrue(driver.getCurrentUrl().startsWith(text));
    }

    @Then("^I close my browser")
    public void ICloseMyBrowser() throws Throwable {
        driver.quit();
    }
}
