define([
	'backbone',
	'deckCollection',
	'playerModel'
], function (Backbone, Deck, Player) {
	'use strict';

	var Game = Backbone.Model.extend({
		constructor: function() {
			this.deck = new Deck();
			this.player = new Player();
		}
	});
	return Game;
});
