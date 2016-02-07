package io.dashboardhub.pipelinedashboard.definitions.generic;

import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;

public class UrlDefinitions extends PipelinedashboardApplicationTests {

    @When("^I go (.*)$")
    public void I_go_to(String uri) {
        driver.get(withBaseUrl(uri));
    }
}
