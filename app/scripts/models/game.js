define([
	'backbone',
	'cardsCollection',
	'playerModel'
], function (Backbone, Cards, Player) {
	'use strict';

	var ATTRIBUTES = ['color', 'shape', 'pattern', 'quantity'];
	var ATTRIBUTE_QUANTITY = 3;

	var Game = Backbone.Model.extend({
		constructor: function() {
			this.deck = new Cards();
			this.player = new Player();
			this.generateDeck();
			this.deck.shuffle();
		},
		hand: function (){
			return this.deck.where({'active': true});
		},
		deal: function() {
			var numberNeeded = 12 - this.hand().length;
			this.deck.where({'active': false}).slice(0, numberNeeded).map(function(card) {
				card.set({'active': true});
			});
		}
	});

	Game.prototype.generateDeck = function generateDeck() {
		var self = this,
			cardConfigValues = [],
			cardConfig = {},
			depth = 1;

		function createCards() {
			_(ATTRIBUTE_QUANTITY).times(function(x) {
				cardConfigValues[depth-1] = x+1;
				if(depth === ATTRIBUTES.length) {
					// Build Card Config
					ATTRIBUTES.map(function(value, index) {
						cardConfig[value] = cardConfigValues[index];
					});
					self.deck.add(cardConfig);
				} else {
					depth += 1;
					createCards();
				}
			}, self);
			depth -= 1;
		}
		createCards();
	};

	return Game;
});
