define([],
	function() {
		return {
			update : function(viewname, viewModelItemName) {
				var name = viewname + '-' + viewModelItemName;
				var evt;

				if (document.createEvent) {
				    evt = document.createEvent('HTMLEvents');
				    evt.initEvent(name, true, true);
				} else {
				    evt = document.createEventObject();
					evt.eventType = name;
				}

				evt.eventName = name;

				if (document.dispatchEvent) {
				    document.dispatchEvent(evt);
				} else {
				    document.fireEvent('on' + evt.eventType, evt);
				}
			}
		};
	}
);