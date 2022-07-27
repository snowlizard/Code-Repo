/*
    runs after RemindMeofOverdueActiveIncidentsAssignedToMe it
    uses the same query but adds assigned_to query to refine to only
    that user. The email itself contains a table of incidents
    that are overdue.
*/


(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    var gr = new GlideRecord('incident_metric');
    gr.addEncodedQuery('inc_active=true^inc_priorityIN1,2^mi_definition=35f0791ac0a808ae008f0a2b1dc1030c^inc_sys_created_onRELATIVELT@dayofweek@ago@5');
	gr.addQuery('inc_assigned_to', current.getValue('sys_id'));
    gr.query();
	
    var incidents = [];

    while (gr.next()) {
        var obj = {};
        obj.number = gr.getValue('inc_number');
        obj.priority = gr.getValue('inc_priority');
        obj.short_desc = gr.getValue('inc_short_description');
        obj.created = gr.getValue('inc_sys_created_on');
		obj.sys_id = gr.getValue('inc_sys_id');
		obj.assigned_to = gr.getValue('inc_assigned_to');
        incidents.push(obj);
    }
	
	template.print('The following Incident(s) are active and overdue: ');
	template.print('<table><tr><th>Incident</th><th>Short Description</th><th>Priority</th><th>Create Date</th></tr>');
	incidents.forEach(function(inc){
		template.print('<tr>');
		template.print('<td>'+'<a href="/incident.do?sys_id='+inc.sys_id+'">'+inc.number+'</a>'+'</td>');
		template.print('<td>'+inc.short_desc+'</td>');
		template.print('<td>'+inc.priority+'</td>');
		template.print('<td>'+inc.created.slice(0,10)+'</td>');
		template.print('</tr>');
	});
	template.print('</table>');
	

})(current, template, email, email_action, event);