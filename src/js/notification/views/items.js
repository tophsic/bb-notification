/**
 *  @module notification/views/item
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var ItemsView = Backbone.View.extend({
  template: _.template(require('notification/templates/items')),

  initialize: function(options) {
    this.options = options || {};

    if (!this.options.collection) {
      throw new Error('Collection must be set');
    }

    this.collection = this.options.collection;
    this.listenTo(this.collection, {
      "sync":  function() { this.onCollectionSync(); }
    });

    this.$el.html(this.template()) ;
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  onCollectionSync: function(collection, notifications) {
    //TODO implement
  }
});



module.exports = ItemsView;
