// IGNORE ERROR ON LINE 3
// Angular Provider, Type: Directive
function () {
	function timeSince(date) {

		date=new Date(date);
		var seconds = Math.floor((new Date() - date) / 1000);

		var interval = Math.floor(seconds / 31536000);

		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}	
    return {
        restrict: 'E', //Element
        template: '<span uib-tooltip="{{date}}">{{ago}}</span> ago', //Output of directive

        scope: { //create an isolated scope
            //scope.date bound to the property passed in through the element
            date: '='
        },

        //Client controller	
        link: function(scope) {
            scope.ago = timeSince(scope.date);
        }
    };
}