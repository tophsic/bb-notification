/**
 *  @module notification/views/item
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var ItemView = Backbone.View.extend({
  template: _.template(require('notification/templates/item')),

  tagName: 'li',
  className: 'notification-item',

  initialize: function(options) {
    this.listenTo(this.model, {
      "change": this.render,
      "destroy": this.remove
    });

    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});



module.exports = ItemView;
