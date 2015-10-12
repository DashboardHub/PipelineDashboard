package io.dashboardhub.Controller;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.Map;

@Controller
@EnableOAuth2Sso
public class ProjectsController {

    @RequestMapping("/projects")
    public String list(Map<String, Object> model) {
        model.put("title", "Projects");
        model.put("message", "List of your projects");
        model.put("date", new Date());

        return "home";
    }
}
