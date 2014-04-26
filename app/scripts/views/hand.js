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
			this.listenTo(this.hand, 'shuffle', this.render);
			this.render();
		},
		render: function render() {
			var self = this;
			self.$el.empty();
			_.each(this.hand.models, function(card) {
				self.$el.append(new CardView(card).render().el);
			});
			// this.$el.html(this.template(this.card.toJSON()));
			return this;
		}
	});
	return HandView;
});
