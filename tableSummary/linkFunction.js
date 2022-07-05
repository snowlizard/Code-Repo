function link(scope, element, attrs, controller) {
	// you cannot inject services into the link function, but you can get them another way...
	var $window = $injector.get('$window');

       //you still have access to data and options objects from the server
	if (controller.options.enable_arrow_key_selection)
		registerWindowEvents();

	function registerWindowEvents() {
		// register the window listener
		angular.element($window).on('keyup', function(event) {
			
			//if button pressed is up or down, record it, otherwise exit
			var direction = event.keyCode == 40 ? 'down' : (event.keyCode == 38 ? 'up' : false);
			if (!direction)
				return;

			// using 'element.find' ensures you are only searching the current widget
			var selected = element.find('.selected');
			
			// find the element below the selected one, and select it
			var next = direction == 'up' ? selected.prev() : selected.next();
			if (!next.length) {
				
				// if there is no next item, go to the top, or bottom depending on the direction selected
				var allItems = element.find('.list-group-item');
				if (direction == 'up') {
					next = allItems[allItems.length - 1];
				} else {
					next = allItems[0];
				}
			}
			
			//if you got here, there is a "next" element. that can use .click to process the ng-click on the element
			next.click();
			
		});
	}
	
}