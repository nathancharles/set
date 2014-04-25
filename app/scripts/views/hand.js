define([
	'backbone',
	'underscore',
	'cardView'
], function (Backbone, _, CardView) {
	'use strict';

	var HandView = Backbone.View.extend({
		el: $('.jumbotron'),
		hand: null,
		template: _.template($('#hand-template').html()),
		initialize: function initialize(hand) {
			this.hand = hand;
			this.render();
		},
		render: function render() {
			var self = this;
			_.each(this.hand.models, function(card) {
				self.$el.append(new CardView(card).render());
			});
			// this.$el.html(this.template(this.card.toJSON()));
			return this;
		}
	});
	return HandView;
});
