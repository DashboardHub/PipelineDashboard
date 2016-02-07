package io.dashboardhub.pipelinedashboard.service.exception;

import java.security.InvalidParameterException;

public class PermissionDeniedException extends InvalidParameterException {

    public PermissionDeniedException(String msg) {
        super(msg);
    }
}
