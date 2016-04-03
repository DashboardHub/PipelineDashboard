package io.dashboardhub.pipelinedashboard.definitions;

import cucumber.api.java.en.Then;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.repository.UserRepository;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.history.Revision;

import java.lang.reflect.Field;
import java.util.List;

public final class ProfileDefinitions extends PipelinedashboardApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Then("^there is a new revision for my User$")
    public void there_is_a_new_audit_entry_for_my_user() throws Exception {
        User currentUser = userRepository.findByUsername("TestUser");
        Revision<Integer, User> latestRevision = userRepository.findLastChangeRevision(currentUser.getId());
        Assert.assertTrue(latestRevision.getRevisionNumber() > 1);
    }

    @Then("^the latest revised value for (.*) is (.*)$")
    public void the_latest_revised_value_for(String fieldName, String value) throws Exception {
        checkRevisionFieldValue(fieldName, value, 0);
    }

    @Then("^the previous revised value for (.*) is (.*)$")
    public void the_previous_revised_value_for(String fieldName, String value) throws Exception {
        checkRevisionFieldValue(fieldName, value, 1);
    }

    private void checkRevisionFieldValue(String fieldName, String value, int goBackRevisions) {
        if (value.equals("null")) { // handle ability to pass a null via feature spec
            value = null;
        }
        User currentUser = userRepository.findByUsername("TestUser");
        Revision<Integer, User> latestRevision = userRepository.findLastChangeRevision(currentUser.getId());
        Revision<Integer, User> checkRevision;
        if (goBackRevisions > 0) {
            List<Revision<Integer, User>> allRevisions = userRepository.findRevisions(latestRevision.getEntity().getId()).getContent();
            checkRevision = allRevisions.get(allRevisions.size() - goBackRevisions - 1);
        } else {
            checkRevision = latestRevision;
        }
        User revisedUser = checkRevision.getEntity();
        try {
            Field field = revisedUser.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            Object revisionValue = field.get(revisedUser);
            Assert.assertEquals(revisionValue, value);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            Assert.fail("Unable to access field " + fieldName);
        }
    }

}
