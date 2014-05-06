define([
	'backbone',
	'underscore',
	'cardModel'
], function (Backbone, _, Card) {
	'use strict';

	var Hand = Backbone.Collection.extend({
		model: Card,

		shuffle: function shuffle() {
			this.models = _.shuffle(this.models);
			this.trigger('shuffle');
			return this;
		},
	});
	return Hand;
});
