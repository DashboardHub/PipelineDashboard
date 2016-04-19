package io.dashboardhub.pipelinedashboard.controller;

import io.dashboardhub.pipelinedashboard.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public final class HomeController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String overview(Model model) {
        model.addAttribute("projects", projectService.findAllByPublicRecent());

        return "home/overview";
    }
}
