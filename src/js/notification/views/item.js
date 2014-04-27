/**
 *  @module notification/views/item
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var ItemView = Backbone.View.extend({
  template: _.template(require('notification/templates/item')),

  initialize: function(options) {
    this.$el.html(this.template(this.model.toJSON())) ;

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
