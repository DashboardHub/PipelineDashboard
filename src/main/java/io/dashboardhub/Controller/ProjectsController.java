package io.dashboardhub.Controller;

import io.dashboardhub.Entity.Project;
import io.dashboardhub.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
@EnableOAuth2Sso
public class ProjectsController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = {"/projects"}, method = RequestMethod.GET)
    public String list(Model model) {
        // @TODO: should be getMyProjects
        model.addAttribute("projects", this.projectService.getAll());

        return "projects/list";
    }

    @RequestMapping(value = {"/projects/add"}, method = RequestMethod.GET)
    public String add(@ModelAttribute Project project, Model model) {
        model.addAttribute("project", project);

        return "projects/add";
    }

    @RequestMapping(value = {"/projects/add"}, method = RequestMethod.POST)
    public String save(@Valid Project project, BindingResult bindingResult, Model model) {
        model.addAttribute("project", project);

        if (bindingResult.hasErrors()) {
            return "projects/add";
        }

        if (this.projectService.save(project)) {
            return "redirect:/projects";
        }

        model.addAttribute("error", "An error occurred please try again");

        return "projects/add";
    }
}
