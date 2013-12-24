define(['lodash', 'ractive', 'controller/machine', 'enum/uuidformat', 'text!view/generator/generator.html', 'css!view/generator/generator.css'],
	function(_, Ractive, Machine, UuidFormat, template) {

		var view = function(element) {
			this.element = element;
			this.amount = 1;

			this.formatting = [
				{ enum: UuidFormat.Uppercase, selected: false },
				{ enum: UuidFormat.Hyphens, selected: true },
				{ enum: UuidFormat.Braces, selected: true }
			];

			this.machine = new Machine([UuidFormat.Hyphens, UuidFormat.Braces]);

			this.generate();
			this.render();
		};

		view.prototype.generate = function() {
			this.machine.generate(this.amount);
		};

		view.prototype.format = function() {
			var selectedFormat = _.pluck(_.filter(this.formatting, function(option) {
				return option.selected;
			}), 'enum');
			this.machine.format(selectedFormat);
		};

		view.prototype.render = function() {
			var self = this;

			self.ractive = new Ractive({
				el: self.element,
				template: template,
				data : {
					amount: self.amount,
					formatting: self.formatting,
					uuidlist: self.machine.formatted,
					generate: self.machine.generate,
					format: self.format,
					hasUuids : true
				}
			});

			self.ractive.on('amount', function() { self.amount = this.data.amount; });
			self.ractive.on('generate', function() {
				self.generate();
				self.ractive.set('uuidlist', self.machine.formatted);
				self.ractive.set('hasUuids', self.machine.formatted.length > 0);
			});
			self.ractive.on('format', function(event, id) {
				if (navigator.userAgent.indexOf('Firefox/') != -1 && event.node.tagName === 'INPUT') {
					// Ractive.js/Firefox bug: Checkbox selections don't get updated automatically
					// like they do in Webkit browsers, so we have to set them maually. Haven't tested IE yet.
					self.formatting[id].selected = !self.formatting[id].selected;
				}
				event.original.stopPropagation();
				self.format();
				self.ractive.set('uuidlist', self.machine.formatted);
				self.ractive.set('hasUuids', self.machine.formatted.length > 0);
			});
			self.ractive.on('clear', function() {
				self.machine.clear();
				self.ractive.set('uuidlist', self.machine.formatted);
				self.ractive.set('hasUuids', self.machine.formatted.length > 0);
			});
		};

		return view;
	}
);