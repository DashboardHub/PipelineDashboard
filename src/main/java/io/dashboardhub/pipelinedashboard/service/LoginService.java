package io.dashboardhub.pipelinedashboard.service;

import io.dashboardhub.pipelinedashboard.domain.Login;
import io.dashboardhub.pipelinedashboard.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login save(Login login) {
        return this.loginRepository.save(login);
    }
}
