define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Player = Backbone.Model.extend({
		defaults: {
			sets: [],
			message: {}
		}
	});
	return Player;
});
