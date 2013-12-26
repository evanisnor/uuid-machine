define([
	'lodash',
	'ractive',
	'controller/machine',
	'enum/uuidformat',
	'text!view/generator/generator.html',
	'text!view/generator/footer.html',
	'text!view/generator/formatOption.html',
	'text!view/spinner/spinner.html',
	'css!view/generator/generator.css',
	'css!view/spinner/spinner.css'],

	function(_, Ractive, Machine, UuidFormat, generatorTemplate, footerTemplate, formatOptionTemplate, spinnerTemplate) {

		var view = function(element) {
			this.element = element;
			this.amount = 1;

			this.formatting = [
				{ enum: UuidFormat.Uppercase, selected: false },
				{ enum: UuidFormat.Hyphens, selected: true },
				{ enum: UuidFormat.Braces, selected: true }
			];

			this.machine = new Machine([UuidFormat.Hyphens, UuidFormat.Braces]);
			this.machine.generate(this.amount);

			this.render();
		};

		view.prototype.generate = function(done) {
			var self = this;
			setTimeout(function() {
				self.machine.generate(self.amount);
				if (done) {
					done();
				}
			}, 1);
		};

		view.prototype.format = function(done) {
			var self = this;
			setTimeout(function() {
				var selectedFormat = _.pluck(_.filter(self.formatting, function(option) {
					return option.selected;
				}), 'enum');
				self.machine.format(selectedFormat);
				if (done) {
					done();
				}
			}, 1);
		};

		view.prototype.clear = function(done) {
			var self = this;
			setTimeout(function() {
				self.machine.clear();
				if (done) {
					done();
				}
			}, 1);
		};

		view.prototype.render = function() {
			var self = this;

			self.ractive = new Ractive({
				el: self.element,
				template: generatorTemplate,
				partials: {
					footer: footerTemplate,
					spinner: spinnerTemplate,
					formatOption: formatOptionTemplate
				},
				data: {
					amount: self.amount,
					formatting: self.formatting,
					uuidlist: self.machine.formatted,
					hasUuids: true,
					hasManyUuids: false,
					isWorking: false
				}
			});

			self.ractive.on('amount-update', function() { self.amount = this.data.amount; });

			self.ractive.on('generate', function() {
				self.ractive.set('isWorking', true);
				self.generate(function() {
					self.ractive.set('uuidlist', self.machine.formatted);
					self.ractive.set('hasUuids', self.machine.formatted.length > 0);
					self.ractive.set('hasManyUuids', self.machine.formatted.length >= 50);
					self.ractive.set('isWorking', false);
				});
			});

			self.ractive.on('format', function(event, id) {
				self.ractive.set('isWorking', true);
				if (navigator.userAgent.indexOf('Firefox/') != -1 && event.node.tagName === 'INPUT') {
					// Ractive.js/Firefox bug: Checkbox selections don't get updated automatically
					// like they do in Webkit browsers, so we have to set them maually. Haven't tested IE yet.
					self.formatting[id].selected = !self.formatting[id].selected;
				}
				event.original.stopPropagation();
				self.format(function() {
					self.ractive.set('uuidlist', self.machine.formatted);
					self.ractive.set('hasUuids', self.machine.formatted.length > 0);
					self.ractive.set('hasManyUuids', self.machine.formatted.length >= 50);
					self.ractive.set('isWorking', false);
				});
			});

			self.ractive.on('clear', function() {
				self.ractive.set('isWorking', true);
				self.clear(function() {
					self.ractive.set('uuidlist', self.machine.formatted);
					self.ractive.set('hasUuids', self.machine.formatted.length > 0);
					self.ractive.set('hasManyUuids', self.machine.formatted.length >= 50);
					self.ractive.set('isWorking', false);
				});
			});
		};

		return view;
	}
);