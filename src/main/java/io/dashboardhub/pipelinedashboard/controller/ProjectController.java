package io.dashboardhub.pipelinedashboard.controller;

import io.dashboardhub.pipelinedashboard.domain.Project;
import io.dashboardhub.pipelinedashboard.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = {"/project"}, method = RequestMethod.GET)
    public String list(Model model) {
        model.addAttribute("projects", projectService.findAll());

        return "project/list";
    }

    @RequestMapping(value = {"/project/add"}, method = RequestMethod.GET)
    public String add(Model model) {

        Project project = new Project();

        model.addAttribute("project", project);

        return "project/add";
    }

    @RequestMapping(value = {"/project/edit/{uid}"}, method = RequestMethod.GET)
    public String edit(@PathVariable("uid") String uid, Model model, final RedirectAttributes redirectAttributes) {

        Project project = projectService.findByUid(uid);
        if (project == null) {
            redirectAttributes.addFlashAttribute("error", "Not found");

            return "redirect:/project";
        }

        model.addAttribute("uid", uid);
        model.addAttribute("project", project);

        return "project/edit";
    }

    @RequestMapping(value = {"/project/add"}, method = RequestMethod.POST)
    public String addSave(
            @Valid Project project,
            BindingResult bindingResult,
            final RedirectAttributes redirectAttributes,
            Model model
    ) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("error", "An error occurred please try again");

            return "project/add";
        }

        projectService.save(project);
        redirectAttributes.addFlashAttribute("success", "Successfully saved");

        return "redirect:/project";
    }

    @RequestMapping(value = {"/project/edit/{uid}"}, method = RequestMethod.POST)
    public String editSave(
            @PathVariable("uid") String uid,
            @Valid Project project,
            BindingResult bindingResult,
            final RedirectAttributes redirectAttributes,
            Model model
    ) {

        projectService.findByUid(uid);
        if (bindingResult.hasErrors()) {
            model.addAttribute("error", "An error occurred please try again");

            return "project/edit";
        }

        projectService.save(project);
        redirectAttributes.addFlashAttribute("success", "Successfully saved");

        return "redirect:/project";
    }

    @RequestMapping(value = {"/project/delete/{uid}"}, method = RequestMethod.GET)
    public String delete(@PathVariable("uid") String uid, final RedirectAttributes redirectAttributes, Model model) {
        Project project = projectService.findByUid(uid);
        if (project == null) {
            redirectAttributes.addFlashAttribute("error", "An error occurred please try again");

            return "redirect:/project";
        }

        projectService.delete(project);
        redirectAttributes.addFlashAttribute("success", "Successfully removed");

        return "redirect:/project";
    }
}
