package io.dashboardhub.pipelinedashboard.definitions.generic;

import cucumber.api.java.en.Then;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;

public final class DisplayDefinition extends PipelinedashboardApplicationTests {

    @Then("^I see element (.*)")
    public void I_see_element(String element) {
        Boolean isDisplayed = driver.findElement(By.id(element)).isDisplayed();

        Assert.assertEquals(true, isDisplayed);
    }

    @Then("^I can not see element (.*)$")
    public void I_can_not_see_the_element(String id) {
        Boolean found;
        try {
            driver.findElement(By.id(id));
            found = true;
        } catch (org.openqa.selenium.NoSuchElementException e) {
            found = false;
        }

        Assert.assertEquals(false, found);
    }
}
