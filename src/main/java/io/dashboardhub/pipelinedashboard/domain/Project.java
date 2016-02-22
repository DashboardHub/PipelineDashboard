package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "uid_idx", columnNames = "uid"))
public final class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 255)
    private String uid = UUID.randomUUID().toString();

    @NotNull
    @Size(min = 5, max = 64)
    private String name;

    @Size(max = 1024)
    private String description;

    @NotNull
    private Boolean isPrivate = false;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
}
