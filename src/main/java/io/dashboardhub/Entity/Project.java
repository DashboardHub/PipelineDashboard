package io.dashboardhub.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonRootName(value = "_embedded.project")
public class Project {

    @Size(min=4, max=32)
    private String name;

    private String description;

    private Boolean isPublic = true;

    private Integer views = 0;

    private List<Repository> repositories = new ArrayList<Repository>();

    Project() {}

    public Project(String name) {
        this.name = name;
    }
}
