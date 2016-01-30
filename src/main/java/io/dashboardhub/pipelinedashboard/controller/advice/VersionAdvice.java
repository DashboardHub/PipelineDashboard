package io.dashboardhub.pipelinedashboard.controller.advice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class VersionAdvice {

    @Value("${version}")
    protected String version;

    @ModelAttribute("version")
    public String getVersion() {
        return this.version;
    }
}
