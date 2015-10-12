package io.dashboardhub.Controller;

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
    public String home(Model model) {
        model.addAttribute("latest", projectService.getLatest());
        model.addAttribute("popular", projectService.getPopular());

        return "home";
    }
}
