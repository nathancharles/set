define([
	'backbone'
], function (Backbone) {
	'use strict';

	var CardView = Backbone.View.extend({
		template: _.template($('#card-template').html()),
		className: 'card',
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
			var isSelected = this.card.get('selected');
			this.$el.html(this.template(this.card.toJSON()));
			if(isSelected) {
				this.$el.addClass('selected');
			} else {
				this.$el.removeClass('selected');
			}
			return this;
		},
		toggle: function toggle() {
			this.card.toggleSelected();
		}
	});
	return CardView;
});
