package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(uniqueConstraints = @UniqueConstraint(name = "uid_idx", columnNames = "uid"))
public final class Project extends BaseEntity {

    @NotNull
    private String uid;

    @NotNull
    @Size(min = 5, max = 64)
    private String name;

    @Size(max = 1024)
    private String description;

    @NotNull
    private Boolean isPrivate;

    @NotNull
    private Date createdOn = new Date();

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    public Project() {
        this.isPrivate = false;
        this.uid = UUID.randomUUID().toString();
    }
}
