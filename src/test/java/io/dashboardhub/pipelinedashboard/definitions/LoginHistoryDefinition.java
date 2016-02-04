package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

public class LoginHistoryDefinition extends PipelinedashboardApplicationTests {

    @Then("^I see (.*) element in (.*)$")
    public void I_see_element_in(int count, String id) throws Exception {
        List<WebElement> rows = driver.findElements(By.cssSelector("table#" + id + " tbody tr"));

        Assert.assertEquals(count, rows.size());
    }
}
