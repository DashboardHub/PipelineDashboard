package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.hibernate.validator.constraints.Email;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@Audited
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(uniqueConstraints = @UniqueConstraint(name = "username_idx", columnNames = {"username"}))
public class User extends BaseEntity {

    @NotNull
//    @Type(type = "uuid-char")
    private String uid;

    @NotNull
    private String username;

    @Size(min = 5, max = 255)
    private String name;

    @Email
    private String email;

    @Column(name = "last_logged_in", columnDefinition = "TIMESTAMP")
    @Type(type = "org.jadira.usertype.dateandtime.threeten.PersistentZonedDateTime")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime lastLoggedIn;

    private User() {}

    public User(String username) {
        this.username = username;
        this.uid = UUID.randomUUID().toString();
    }
}
