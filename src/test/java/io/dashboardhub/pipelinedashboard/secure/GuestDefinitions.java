package io.dashboardhub.pipelinedashboard.secure;

import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplication;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {PipelinedashboardApplication.class})
@WebIntegrationTest
public class GuestDefinitions {

    final private String baseUrl = "http://localhost";

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    private ResultActions result;

    @Before
    public void setUp() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @When("^I try to access a secure page$")
    public void I_try_to_access_a_secure_page() throws Exception {
        result = mockMvc.perform(MockMvcRequestBuilders.get("/project"));
    }

    @Then("^I get redirected to the login page$")
    public void I_get_redirected_to_the_login_page() throws Exception {
        result.andExpect(MockMvcResultMatchers.redirectedUrl(baseUrl + "/login"));
    }
}
