// Scheduled Job runs daily at 6am

var changeRequests = new GlideRecord('change_request');
changeRequests.addEncodedQuery('start_dateONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()');
changeRequests.query();

while (changeRequests.next()) {
	gs.eventQueue('scheduled_job.change_request', changeRequests, changeRequests.getValue('start_date'), changeRequests.getValue('sys_id'));
}