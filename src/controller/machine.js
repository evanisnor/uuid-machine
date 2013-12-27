define(['lodash', 'util/uuid', 'enum/uuidformat'],
	function(_, Uuid, UuidFormat) {

		var machine = function(defaultFormattingList) {
			this.formatting = defaultFormattingList;

			this.values = [];
			this.formatted = [];
		};

		machine.prototype.generate = function(amount) {
			this.clear();
			for (i = 0; i < amount; i++) {
				this.values.push(Uuid.generate());
			}
			this.formatted = _.clone(this.values);

			if (_.contains(this.formatting, UuidFormat.Uppercase)) {
				this.setUppercase();
			}
			if (_.contains(this.formatting, UuidFormat.Hyphens)) {
				this.setHypens();
			}
			if (_.contains(this.formatting, UuidFormat.Braces)) {
				this.setBraces();
			}
		};

		machine.prototype.clear = function() {
			this.values = [];
			this.formatted = [];
		};

		machine.prototype.format = function(formattingList) {
			if (formattingList) {
				this.previousFormatting = this.formatting;
				this.formatting = formattingList;
			}

			if (_.contains(this.formatting, UuidFormat.Uppercase)
				&& !_.contains(this.previousFormatting, UuidFormat.Uppercase)) {
				this.setUppercase();
			}
			else if (!_.contains(this.formatting, UuidFormat.Uppercase)
					&& _.contains(this.previousFormatting, UuidFormat.Uppercase)) {
				this.unsetUppercase();
			}

			if (_.contains(this.formatting, UuidFormat.Hyphens)
				&& !_.contains(this.previousFormatting, UuidFormat.Hyphens)) {
				this.setHypens();
			}
			else if (!_.contains(this.formatting, UuidFormat.Hyphens)
					&& _.contains(this.previousFormatting, UuidFormat.Hyphens)) {
				this.unsetHypens();
			}

			if (_.contains(this.formatting, UuidFormat.Braces)
				&& !_.contains(this.previousFormatting, UuidFormat.Braces)) {
				this.setBraces();
			}
			else if (!_.contains(this.formatting, UuidFormat.Braces)
					&& _.contains(this.previousFormatting, UuidFormat.Braces)) {
				this.unsetBraces();
			}

		};

		machine.prototype.setUppercase = function() {
			var self = this;
			_.forEach(self.formatted, function(value, index) {
				self.formatted[index] = self.formatted[index].toUpperCase();
			});
		};

		machine.prototype.unsetUppercase = function() {
			var self = this;
			_.forEach(self.formatted, function(value, index) {
				self.formatted[index] = self.formatted[index].toLowerCase();
			});
		};

		machine.prototype.setHypens = function() {
			var self = this;
			_.forEach(self.formatted, function(value, index) {
				var offset = _.contains(self.formatting, UuidFormat.Braces) ? 1 : 0;
				_.forEach([
						8 + offset,
						13 + offset,
						18 + offset,
						23 + offset
					],
					function (position) {
						(function(i) {
							self.formatted[i] = (function(p) {
								return [self.formatted[i].slice(0, p), self.formatted[i].slice(p)].join('-');
							})(position);
 
						})(index);
					}
				);
			});
		};

		machine.prototype.unsetHypens = function() {
			var self = this;
			_.forEach(self.formatted, function(value, index) {
				self.formatted[index] = self.formatted[index].replace(/-/g, '');
			});
		};

		machine.prototype.setBraces = function() {
			var self = this;
			_.forEach(this.formatted, function(value, index) {
				self.formatted[index] = '{' + self.formatted[index] + '}';
			});
		};

		machine.prototype.unsetBraces = function() {
			var self = this;
			_.forEach(this.formatted, function(value, index) {
				self.formatted[index] = self.formatted[index].replace(/[\{\}]/g, '');
			});
		};

		return machine;
	}
);