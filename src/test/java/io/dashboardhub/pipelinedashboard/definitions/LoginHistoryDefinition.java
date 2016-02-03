package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

public class LoginHistoryDefinition extends PipelinedashboardApplicationTests {

    @When("^I go (.*)$")
    public void I_go_to(String uri) {
        driver.get(withBaseUrl(uri));
    }

    @Then("^I see (.*) element in (.*)$")
    public void I_get_the_project_page(int count, String id) throws Exception {
        List<WebElement> rows = driver.findElements(By.cssSelector("table#" + id + " tbody tr"));

        Assert.assertEquals(count, rows.size());
    }
}
