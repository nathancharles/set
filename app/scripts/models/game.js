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
			this.deck.add(generateCardConfigs());
			this.deck.shuffle();
		}
	});

	Game.prototype.getAttributeQuantity = function getAttributeQuantity() {
		return ATTRIBUTE_QUANTITY;
	};

	Game.prototype.getAttributeTypes = function getAttributeTypes() {
		return ATTRIBUTES;
	};

	function generateCardConfigs() {
		var cardConfigValues = [],
			cardConfig = {},
			depth = 1,
			retArr = [];

		function createCards() {
			_(ATTRIBUTE_QUANTITY).times(function(x) {
				cardConfigValues[depth-1] = x+1;
				if(depth === ATTRIBUTES.length) {
					// Build Card Config
					ATTRIBUTES.map(function(value, index) {
						cardConfig[value] = cardConfigValues[index];
					});
					retArr.push(_.clone(cardConfig));
				} else {
					depth += 1;
					createCards();
				}
			});
			depth -= 1;
		}
		createCards();
		return retArr;
	}

	return Game;
});
