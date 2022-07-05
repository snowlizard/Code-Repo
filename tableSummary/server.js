(function() {

	if(!input) {
		data.summary = [];
		data.table = $sp.getParameter('table') || options.table || 'incident';
		data.groupBy = $sp.getParameter('groupBy') || options.aggregate_field || 'category';
		data.fields = $sp.getParameter('fields') || options.display_fields ||
			'number,short_description,sys_updated_on';

		var ga = new GlideAggregate(data.table);
		ga.setGroup(true);
		ga.groupBy(data.groupBy);
		ga.addAggregate('COUNT');
		ga.query();

		while(ga.next()) {
			data.summary.push({
				agName:ga[data.groupBy].getDisplayValue() || 'None',
				agValue:ga[data.groupBy].toString(),
				agCount:ga.getAggregate('COUNT')
			});
		}	
	}
	
	if(input) {
		data.records = [];
		
		var gr = new GlideRecordSecure(input.table);
		gr.addQuery(input.groupBy, input.selectedAg);
		gr.query();
		
		data.labels = [];
		var labels = $sp.getFieldsObject(gr, input.fields);
		
		for (var label in labels){
			data.labels.push({"key": label,
											"type": labels[label].type,
											"value":labels[label].label});
		}
		
		while(gr.next()){
			var o = {};
			
			$sp.getRecordDisplayValues(o, gr, input.fields);
			$sp.getRecordValues(o, gr, 'sys_id');
			data.records.push(o);
		}
	}

})();