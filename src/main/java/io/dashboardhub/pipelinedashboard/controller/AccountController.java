package io.dashboardhub.pipelinedashboard.controller;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AccountController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/profile"}, method = RequestMethod.GET)
    public String profile(Model model) {
        User user = userService.findByCurrentUsername();
        model.addAttribute("user", user);

        return "account/profile";
    }
}
