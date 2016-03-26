package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.hibernate.validator.constraints.Email;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Data
@Audited
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(uniqueConstraints = @UniqueConstraint(name = "username_idx", columnNames = {"username"}))
public class User extends BaseEntity {

    private UUID uid;

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
        this.uid = UUID.randomUUID();
    }
}
