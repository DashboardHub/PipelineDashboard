package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Data
@MappedSuperclass
@Audited
abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "created_by_user")
    @CreatedBy
    private String createdByUser;

    @Column(name = "creation_time", nullable = false, columnDefinition = "TIMESTAMP")
    @Type(type = "org.jadira.usertype.dateandtime.threeten.PersistentZonedDateTime")
    @CreatedDate
    private ZonedDateTime creationTime;

    @Column(name = "modified_by_user")
    @LastModifiedBy
    private String modifiedByUser;

    @Column(name = "modification_time", columnDefinition = "TIMESTAMP")
    @Type(type = "org.jadira.usertype.dateandtime.threeten.PersistentZonedDateTime")
    @LastModifiedDate
    private ZonedDateTime modificationTime;
}