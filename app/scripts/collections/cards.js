define([
	'backbone',
	'underscore',
	'cardModel'
], function (Backbone, _, Card) {
	'use strict';

	var Deck = Backbone.Collection.extend({

		model: Card,

		shuffle: function shuffle() {
			this.trigger('shuffle');
			this.models = _.shuffle(this.models);
			return this;
		}
	});
	return Deck;
});
