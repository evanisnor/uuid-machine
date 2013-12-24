define(['lodash'],
	function (_) {
		//data-bind: text, value, click, checked, foreach

		var viewbinder = function () {};

		viewbinder.prototype.bind = function (elementId, viewname) {
			var context = {
				elementId: elementId,
				element: document.getElementById(elementId),
				viewname: viewname,
				html: '',
				viewmodel: {}
			};

			this.loadView(context, this.render);
		};

		viewbinder.prototype.loadView = function (context, done) {
			var self = this;
			require(['text!view/' + context.viewname + '.html', 'view/' + context.viewname], function (html, viewmodel) {
				context.html = html;
				context.viewmodel = viewmodel;
				done(context, self);
			});
		};

		viewbinder.prototype.render = function (context, self) {
			var wrapperElement = document.createElement('div');
			wrapperElement.setAttribute('class', context.viewname + '-wrapper');
			wrapperElement.innerHTML = context.html;
			context.element.appendChild(wrapperElement);

			self.search(context, wrapperElement);
			
		};

		viewbinder.prototype.search = function (context, el) {
			var self = this;

			if (el.attributes) {
				_.forEach(el.attributes, function (attribute) {
					if (attribute.name === 'data-bind') {
						var properties = attribute.value.split(',');

						_.forEach(properties, function (property) {
							var control = property.split(':')[0].trim();
							var viewModelItemName = property.split(':')[1].trim();

							self.integrate(context, el, control, viewModelItemName);
						});

					}
				});
			}

			_.forEach(el.childNodes, function (child) {
				self.search(context, child);
			});
		};





		viewbinder.prototype.integrate = function (context, el, control, viewModelItemName) {
			var self = this;

			if (control === 'foreach') {
				var array = context.viewmodel[viewModelItemName];
				var htmlTemplate = el.innerHTML + '';
				el.innerHTML = '';
				var populate = function() {
					_.forEach(array, function(item, index) {
						_.clone(htmlTemplate, false, function(newHtml) {
							// newHtml = newHtml.replace('$item', item);
							// newHtml = newHtml.replace('$index', index + '');
						});
					});
				};

				this.captureUpdateEvent(context.viewname, viewModelItemName, function (evt) {
					populate();
				});
			}
			else if (control === 'text' || control === 'value') {
				var value = context.viewmodel[viewModelItemName];
				this.setValue(el, value);

				this.addEventListener(el, 'change', function (evt) {
					var newValue;
					if (el.innerText) { newValue = el.innerText }
					else if (el.textContent) { newValue = el.textContent }
					else if (el.value) { newValue = el.value }
					value = newValue;
				});

				this.captureUpdateEvent(context.viewname, viewModelItemName, function (evt) {
					this.setValue(el, value);
				});
			}
			else if (control === 'click') {
				var fn = context.viewmodel[viewModelItemName];
				var onClick = function (evt) {
					fn();
				}
				this.addEventListener(el, 'click', onClick);
			}
			else if (control === 'checked') {
				var fnName = viewModelItemName.split(viewModelItemName.indexOf('('))[0];
				var value = viewModelItemName.split(viewModelItemName.indexOf('('))[1].replace(/[\(\)]/g, '');
				var fn = context.viewmodel[fnName];
				el.checked = value;

				this.addEventListener(el, 'change', function (evt) {
					value = el.checked;
				});
				
				this.captureUpdateEvent(context.viewname, viewModelItemName, function (evt) {
					el.checked = value;
				});
			}
		};

		viewbinder.prototype.setValue = function (element, value) {
			var tag_name = element.localName;
			if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" ) {
		        element.value = value;
		    } else {
		        element.innerHTML = value;
		    }	
		};

		viewbinder.prototype.captureUpdateEvent = function (viewname, viewModelItemName, callback) {
			if (document.addEventListener) {
				document.addEventListener(viewname + '-' + viewModelItemName, callback, false);
			}
			else {
				document.attachEvent('on' + viewname + '-' + viewModelItemName, callback);
			}
		}

		viewbinder.prototype.addEventListener = function (element, eventType, callback) {
			if (element.addEventListener) {
				element.addEventListener(eventType, callback, false);
			}
			else {
				element.attachEvent('on' + eventType, callback);
			}
		};

		return new viewbinder();
	}
);