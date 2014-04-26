define([
	'backbone',
	'underscore',
	'cardModel'
], function (Backbone, _, Card) {
	'use strict';

	var QUANTITY = 3;

	var Deck = Backbone.Collection.extend({

		model: Card,

		initialize: function() {
			_(QUANTITY).times(function(c) {
				_(QUANTITY).times(function(s) {
					_(QUANTITY).times(function(p) {
						_(QUANTITY).times(function(q) {
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
		}
	});
	return Deck;
});
