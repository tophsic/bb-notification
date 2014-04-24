/**
 *	@module notification/views/item
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var ItemsView = Backbone.View.extend({
  template: _.template(require('notification/templates/items')),

  initialize: function(options) {
		this.$el.html(this.template()) ;
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});



module.exports = ItemsView;
