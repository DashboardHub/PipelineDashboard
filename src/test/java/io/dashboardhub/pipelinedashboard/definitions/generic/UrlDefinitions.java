package io.dashboardhub.pipelinedashboard.definitions.generic;

import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;

public class UrlDefinitions extends PipelinedashboardApplicationTests {

    @When("^I go (.*)$")
    public void I_go_to(String uri) {
        driver.get(withBaseUrl(uri));
    }

    @When("^I get redirected to the (.*) page$")
    public void I_get_redirected_to_the_page(String uri) {
        Assert.assertEquals(withBaseUrl(uri), driver.getCurrentUrl());
    }
}
