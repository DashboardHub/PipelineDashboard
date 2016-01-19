package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "uid_idx", columnNames = "uid"))
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 255)
    private Long uid;

    @NotNull
    @Size(min = 1, max = 255)
    private String name;

//    @ManyToMany(mappedBy="users")
//    private Set<User> users;

    Project() {
    }

    public Project(Long uid, String name) {
        this.uid = uid;
        this.name = name;
    }
}
