define([
	'backbone',
	'underscore',
	'cardModel'
], function (Backbone, _, Card) {
	'use strict';

	var ATTRIBUTES = ['color', 'shape', 'pattern', 'quantity'];
	var ATTRIBUTE_QUANTITY = 3;

	var Deck = Backbone.Collection.extend({

		model: Card,

		initialize: function() {
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
						self.add(cardConfig);
					} else {
						depth += 1;
						createCards();
					}
				}, self);
				depth -= 1;
			}

			createCards();
		},

		shuffle: function shuffle() {
			this.models = _.shuffle(this.models);
			this.trigger('shuffle');
			return this;
		},

		deal: function deal() {
			this.trigger('deal');
			return this.models.slice(0, 12).map(function(card) {
				return card.set({'active': true});
			});
		},
		getAttributes: function getAttributeQuantity() {
			return ATTRIBUTES;
		},
		getAttributeQuantity: function getAttributeQuantity() {
			return ATTRIBUTE_QUANTITY;
		}
	});
	return Deck;
});
