package io.dashboardhub.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableOAuth2Sso
public class HomeController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/")
    public String home(Model model) throws Exception {
        model.addAttribute("Projects", projectService.getLatest());

        return "home";
    }
}
