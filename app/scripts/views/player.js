define([
	'backbone'
], function (Backbone) {
	'use strict';

	var PlayerView = Backbone.View.extend({
		template: _.template($('#player-template').html()),
		initialize: function initialize() {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function render() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
	});
	return PlayerView;
});
