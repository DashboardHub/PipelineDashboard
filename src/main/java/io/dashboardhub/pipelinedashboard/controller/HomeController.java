package io.dashboardhub.pipelinedashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public final class HomeController {

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String overview(Model model) {
        return "home/overview";
    }
}
