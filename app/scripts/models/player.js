define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Player = Backbone.Model.extend({
		constructor: function() {
			this.sets = [];
		}
	});
	return Player;
});
