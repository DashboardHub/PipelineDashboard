package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "username_idx", columnNames = {"username"} ))
public final class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String uid;

    @NotNull
    private String username;

    @Size(min = 5, max = 255)
    private String name;

    @Email
    private String email;

    private String lastLoggedIn;

    User() {
    }

    public User(String username) {
        this.username = username;
    }
}
