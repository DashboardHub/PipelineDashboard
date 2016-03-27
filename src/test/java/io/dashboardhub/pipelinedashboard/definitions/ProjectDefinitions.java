package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import io.dashboardhub.pipelinedashboard.domain.Project;
import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.ProjectRepository;
import io.dashboardhub.pipelinedashboard.repository.UserRepository;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public final class ProjectDefinitions extends PipelinedashboardApplicationTests {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @When("^I have a project with uid (.*) owned by (.*)$")
    public void I_have_a_project(String uid, String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            user = userRepository.save(new User(username));
        }

        Project project = new Project();
        project.setUid(uid);
        project.setName("example-test-project-name " + uid);
        project.setDescription("example-test-project-description " + uid);
        project.setUser(user);

        projectRepository.save(project);
    }

    @When("^I try to access the project page$")
    public void I_try_to_access_the_project_page() {
        driver.get(withBaseUrl("/project"));
    }

    @Then("^I get the project page$")
    public void I_get_the_project_page() throws Exception {
        Assert.assertEquals(withBaseUrl("/project"), driver.getCurrentUrl());
    }
}
