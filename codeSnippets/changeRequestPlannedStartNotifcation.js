// Script action

var plannedStart = new GlideDateTime();
plannedStart.setValue(current.start_date);
var hourAgo = new GlideTime();
hourAgo.setValue("01:00:00");
plannedStart.subtract(hourAgo);

// all datetime data is stored in GMT in servicenow must convert to userlocal time for correct scheduling
var start_date = new GlideDateTime();
start_date.setValue(current.getValue('start_date'));

var scheduledTime = plannedStart.getLocalDate() + ' ' + plannedStart.getUserFormattedLocalTime();
var gdt = new GlideDateTime();
gdt.setValue(scheduledTime);

gs.eventQueueScheduled('scheduled_job.notification', current, current.assigned_to, current.number, gdt);