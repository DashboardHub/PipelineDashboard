package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "provider_username_idx", columnNames = {"provider", "username"} ))
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 255)
    private Integer uid;

    @NotNull
    @Size(min = 6, max = 16)
    private String provider;

    @NotNull
    @Size(min = 1, max = 255)
    private String username;

    @NotNull
    @Size(min = 1, max = 255)
    private String name;

//    @ManyToMany
//    @JoinTable(name="users_projects")
//    private Set<Project> projects;

    User() {
    }

    public User(Integer uid, String username) {
        this.uid = uid;
        this.username = username;
    }
}
