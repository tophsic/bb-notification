/**
 *  @module notification/views/item
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var ItemsView = Backbone.View.extend({
  template: _.template(require('notification/templates/items')),

  defaults: {
    item: {
      view: 'notification/views/item',
      template: null,
    }
  },

  initialize: function(options) {
    this.options = options || {};
    _.defaults(this.options, this.defaults);

    if (!this.options.collection) {
      throw new Error('Collection must be set');
    }

    this.collection = this.options.collection;
    this.listenTo(this.collection, {
      "sync":  function() { this.onCollectionSync.apply(this, arguments); }
    });

    this.itemView = require(this.options.item.view);

    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  onCollectionSync: function(collection, notifications) {
    var view = this,
        content = [];

    _.map(notifications, function(notification) {
      var itemView = new view.itemView({
        model: new view.collection.model(notification)
      });
      content.push(itemView.render().el);
    });

    if (notifications.length === 0) {
      this.$el.hide();
    }

    this.$('ul').html(content);
  }
});



module.exports = ItemsView;
