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
			this.hand = new Cards();
			this.player = new Player();
			this.generateDeck();
		}
	});

	Game.prototype.deal = function deal() {
		var self = this;
		var numberNeeded = 12 - self.hand.length;
		_.times(numberNeeded, function() {
			self.hand.add(self.deck.pop());
		});
	};

	Game.prototype.getAttributeQuantity = function getAttributeQuantity() {
		return ATTRIBUTE_QUANTITY;
	};

	Game.prototype.getAttributeTypes = function getAttributeTypes() {
		return ATTRIBUTES;
	};

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
