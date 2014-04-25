define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Card = Backbone.Model.extend({
		defaults: {
			active: false,
			selected: false
		},
		toggleActive: function toggleActive() {
			this.set({
				active: !this.get('active')
			});
		},
		toggleSelected: function toggleSelected() {
			this.set({
				selected: !this.get('selected')
			});
		}
	});
	return Card;
});
