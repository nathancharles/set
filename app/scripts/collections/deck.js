define([
	'backbone',
	'underscore',
	'cardModel'
], function (Backbone, _, Card) {
	'use strict';

	var COLORS = ['red', 'blue', 'green'];
	var SHAPES = ['triangle', 'square', 'circle'];
	var PATTERNS = ['solid', 'stripe', 'none'];
	var QUANTITIES = [1 ,2 ,3];

	var Deck = Backbone.Collection.extend({

		model: Card,

		initialize: function() {
			_.each(COLORS, function(c) {
				_.each(SHAPES, function(s) {
					_.each(PATTERNS, function(p) {
						_.each(QUANTITIES, function(q) {
							this.add({
								color: c,
								shape: s,
								pattern: p,
								quantity: q
							});
						}, this);
					}, this);
				}, this);
			}, this);
		},

		shuffle: function shuffle() {
			this.models = _.shuffle(this.models);
			return this;
		},

		deal: function deal() {
			return this.models.slice(0, 12).map(function(value) {
				return value.set({active: true});
			});
		}
	});
	return Deck;
});
