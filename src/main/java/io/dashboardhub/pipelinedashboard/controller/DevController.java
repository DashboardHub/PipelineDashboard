package io.dashboardhub.pipelinedashboard.controller;

import io.dashboardhub.pipelinedashboard.domain.User;
import io.dashboardhub.pipelinedashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Profile("dev")
@Controller
@RequestMapping(value = {"/dev"})
public class DevController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/users"}, method = RequestMethod.GET)
    public String list(Model model) {
        List<User> users = userService.findAll().getContent();
        model.addAttribute("users", users);
        return "dev/users";
    }
}
