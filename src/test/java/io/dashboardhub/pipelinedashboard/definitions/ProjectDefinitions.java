package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;

public class ProjectDefinitions extends PipelinedashboardApplicationTests {

    @When("^I try to access the project page$")
    public void I_try_to_access_the_project_page() {
        driver.get(withBaseUrl("/project"));
    }

    @Then("^I get the project page$")
    public void I_get_the_project_page() throws Exception {
        Assert.assertEquals(withBaseUrl("/project"), driver.getCurrentUrl());
    }
}
