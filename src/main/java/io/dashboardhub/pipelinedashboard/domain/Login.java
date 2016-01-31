package io.dashboardhub.pipelinedashboard.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private User user;

    private String browser;
    private String ip;
    private Date createdOn = new Date();
}
