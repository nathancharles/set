define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Card = Backbone.Model.extend({
		defaults: {
			selected: false
		},
		toggleSelected: function toggleSelected() {
			this.set({
				selected: !this.get('selected')
			});
		}
	});
	return Card;
});
