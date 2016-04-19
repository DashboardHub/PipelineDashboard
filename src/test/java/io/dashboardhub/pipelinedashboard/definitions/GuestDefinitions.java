package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;

public final class GuestDefinitions extends PipelinedashboardApplicationTests {

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() {
        driver.get(withBaseUrl("/project"));
    }
}
