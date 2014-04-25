define([
	'backbone'
], function (Backbone) {
	'use strict';

	var CardView = Backbone.View.extend({
		template: _.template($('#card-template').html()),
		card: null,
		events: {
			'click': 'toggle'
		},
		initialize: function initialize(card) {
			this.card = card;
			_.bindAll(this, 'render');
			this.card.bind('change', this.render());
			// this.render();

		},
		render: function render() {
			// this.$el.html(this.template(this.card.toJSON()));
			// return this;
			return this.template(this.card.toJSON());
		},
		toggle: function toggle() {
			console.log('here');
			this.card.toggleSelected();
		}
	});
	return CardView;
});
