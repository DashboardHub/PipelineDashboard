package io.dashboardhub.pipelinedashboard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public final class AuthenticationController {

    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public String login() {
        return "authentication/login";
    }
}
