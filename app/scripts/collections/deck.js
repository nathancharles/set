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
			// TODO: use recursive function
			_(this.getAttributeQuantity()).times(function(c) {
				_(this.getAttributeQuantity()).times(function(s) {
					_(this.getAttributeQuantity()).times(function(p) {
						_(this.getAttributeQuantity()).times(function(q) {
							this.add({
								color: c+1,
								shape: s+1,
								pattern: p+1,
								quantity: q+1
							});
						}, this);
					}, this);
				}, this);
			}, this);
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
