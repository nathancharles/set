define([
	'backbone',
	'underscore',
	'cardModel'
], function (Backbone, _, Card) {
	'use strict';

	var Hand = Backbone.Collection.extend({
		model: Card
	});
	return Hand;
});
