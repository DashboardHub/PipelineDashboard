package io.dashboardhub.pipelinedashboard.provider;

import io.dashboardhub.pipelinedashboard.service.DateTimeService;
import org.springframework.data.auditing.DateTimeProvider;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class AuditingDateTimeProvider implements DateTimeProvider {

    private DateTimeService dateTimeService;

    public AuditingDateTimeProvider(DateTimeService dateTimeService) {
        this.dateTimeService = dateTimeService;
    }

    @Override
    public Calendar getNow() {
        return GregorianCalendar.from(dateTimeService.getCurrentDateAndTime());
    }
}
