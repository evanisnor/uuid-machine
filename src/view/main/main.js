define([
	'ractive',
	'view/generator/generator',
	'text!view/main/main.html',
	'css!view/main/main.css'
	],
	function (Ractive, GeneratorView, mainTemplate) {

		var view = function(element) {
			this.element = element;
			this.render();
		};

		view.prototype.render = function() {
			var self = this;
			self.ractive = new Ractive({
				el: self.element,
				template: mainTemplate
			});

			new GeneratorView('#view-generator');
		};

		return view;

	}
);