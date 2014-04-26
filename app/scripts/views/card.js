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
			this.listenTo(this.card, 'change', this.render);
		},
		render: function render() {
			this.$el.html(this.template(this.card.toJSON()));
			// Use this to not have extra container, events are lost though
			// this.setElement(this.template(this.card.toJSON()));
			return this;
		},
		toggle: function toggle() {
			this.card.toggleSelected();
		}
	});
	return CardView;
});
