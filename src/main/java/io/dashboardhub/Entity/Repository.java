package io.dashboardhub.Entity;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Repository {

    private String name;

    private String description;

    private String url;

    private Integer views = 0;

    public Repository(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
