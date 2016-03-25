package io.dashboardhub.pipelinedashboard.definitions.generic;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;

public final class FormDefinitions extends PipelinedashboardApplicationTests {

    @When("^I fill in the field (.*) with (.*)$")
    public void I_fill_in_the_field(String field, String value) {
        driver.findElement(By.id(field)).clear();
        driver.findElement(By.id(field)).sendKeys(value);
    }

    @Then("^Submit the form (.*)$")
    public void I_submit_form(String id) {
        driver.findElement(By.id(id)).submit();
    }

    @Then("^the field (.*) contains (.*)$")
    public void I_submit_form(String id, String expected) {
        String actual = driver.findElement(By.id(id)).getAttribute("value");

        Assert.assertEquals(expected, actual);
    }
}
