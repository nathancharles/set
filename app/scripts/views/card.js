define([
	'backbone'
], function (Backbone) {
	'use strict';

	var CardView = Backbone.View.extend({
		tagName: 'div',
		className: 'card',
		events: {
			'click': 'toggle'
		},
		toggle: function toggle() {
			this.model.set({selected: true});
		}
	});
	return CardView;
});
