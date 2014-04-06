define([
	'backbone',
	'underscore',
	'card'
], function (Backbone, _, Card) {
	'use strict';

	var COLORS = ['red', 'blue', 'green'];
	var SHAPES = ['triangle', 'square', 'circle'];
	var PATTERNS = ['solid', 'stripe', 'none'];
	var QUANTITIES = ['one', 'two', 'three'];

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

		shuffle: function() {
			this.models = _.shuffle(this.models);
		},

		deal: function() {
			return this.slice(0, 16).map(function(value, index) {
				value.set({active: true});
			});
		}
	});
	return Deck;
});
