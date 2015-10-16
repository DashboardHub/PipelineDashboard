package io.dashboardhub.Controller;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.concurrent.Future;

@Controller
@EnableOAuth2Sso
public class HomeController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/")
    public String home(Model model) {
        Future<List<Project>> latest = projectService.getLatest();
        Future<List<Project>> popular = projectService.getPopular();

        try {
            model.addAttribute("latest", latest.get());
            model.addAttribute("popular", popular.get());
        } catch(Exception e) {
            System.out.println("ERROR in async thread " + e.getMessage());
        }

        return "home";
    }
}
