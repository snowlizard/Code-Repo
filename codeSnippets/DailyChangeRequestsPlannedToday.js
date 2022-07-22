// Scheduled Job runs daily at 6am

var changeRequests = new GlideRecord('change_request');
changeRequests.addEncodedQuery('start_dateONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()');
changeRequests.query();

while (changeRequests.next()) {
    var time = new GlideTime();
    time.setValue("01:00:00");

    var start_date = new GlideDateTime();
    start_date.setValue(changeRequests.start_date);
    start_date.subtract(time);


    gs.eventQueueScheduled('scheduled_job.change_request', changeRequests,
        changeRequests.getValue('number'), changeRequests.getValue('sys_id'),
        start_date.getDisplayValue());
}