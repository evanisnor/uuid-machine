define([],
	function() {

		var uuid = function() {
		}

		uuid.prototype.generate = function() {
		    var d = new Date().getTime();
		    var value = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
		    });
		    return value;
		}

		return new uuid();
	}
)