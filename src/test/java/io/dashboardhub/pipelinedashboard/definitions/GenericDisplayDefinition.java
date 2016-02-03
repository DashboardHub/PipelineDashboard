package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Then;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;

public class GenericDisplayDefinition extends PipelinedashboardApplicationTests {

    @Then("^I see element (.*)")
    public void I_see_element(String element) {
        Boolean isDisplayed = driver.findElement(By.id(element)).isDisplayed();

        Assert.assertEquals(true, isDisplayed);
    }
}
