define([
	'backbone',
	'handCollection'
], function (Backbone, Hand) {
	'use strict';

	var Player = Backbone.Model.extend({
		constructor: function() {
			this.hand = new Hand();
		}
	});
	return Player;
});
