package io.dashboardhub.pipelinedashboard;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = PipelinedashboardApplication.class)
@WebAppConfiguration
@IntegrationTest("server.port:8082")
@ActiveProfiles("test")
public class PipelinedashboardApplicationTests {

    @Test
    public void contextLoads() {
    }
}
