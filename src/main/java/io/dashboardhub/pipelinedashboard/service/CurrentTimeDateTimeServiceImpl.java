package io.dashboardhub.pipelinedashboard.service;

import java.time.ZonedDateTime;

public class CurrentTimeDateTimeServiceImpl implements DateTimeService {

    @Override
    public ZonedDateTime getCurrentDateAndTime() {
        return ZonedDateTime.now();
    }
}
