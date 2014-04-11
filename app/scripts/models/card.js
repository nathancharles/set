define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Card = Backbone.Model.extend({
		defaults: {
			active: false,
			selected: false
		},
		toggle: function toggle() {
			this.save({
				active: !this.get('active')
			});
		}
	});
	return Card;
});
