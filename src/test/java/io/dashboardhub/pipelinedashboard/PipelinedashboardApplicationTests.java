package io.dashboardhub.pipelinedashboard;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationContextLoader;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@IntegrationTest("server.port:8081")
@ContextConfiguration(classes = PipelinedashboardApplication.class, loader = SpringApplicationContextLoader.class)
public class PipelinedashboardApplicationTests {

    @Test
    public void contextLoads() {
    }
}
