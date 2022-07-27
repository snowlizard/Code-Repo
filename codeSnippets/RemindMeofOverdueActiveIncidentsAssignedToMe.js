// scheduled job runs daily 6AM EST

/* Queries incident metric table for active incidents
   that have a priority of 1 or 2 and have been open for
   more than 5 days. Push every unique user to a list and
   call eventQueue to then run an email script.
   Required: Register 'incident.overdueReminder' in event registry
*/
var gr = new GlideRecord('incident_metric');
gr.addEncodedQuery('inc_active=true^inc_priorityIN1,2^inc_sys_created_onRELATIVELT@dayofweek@ahead@5^mi_definition=35f0791ac0a808ae008f0a2b1dc1030c');
gr.query();

var users = [];

while (gr.next()) {
	var assigned_to = gr.getValue('inc_assigned_to');
    if (users.indexOf(assigned_to) < 0) {
		users.push(assigned_to);
    }
}

users.forEach(function(user) {
	var urec = new GlideRecord('sys_user');
	urec.addQuery('sys_id', user);
	urec.query();
	
	while(urec.next()){
		gs.eventQueue('incident.overdueReminder', urec, user, "", "");
	}
});