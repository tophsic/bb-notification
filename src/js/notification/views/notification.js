/**
 *	@module notifications/views/notification
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var NotificationView = Backbone.View.extend({
  defaults: {
    template: 'notification/templates/notification',
  },

  initialize: function(options) {
    this.options = options || {};
    _.defaults(this.options, this.defaults);

    if (!this.options.collection) {
      throw new Error('Collection must be set');
    }

    if (!this.options.template) {
      throw new Error('Template must be set');
    }

    this.collection = this.options.collection;
    this.listenTo(this.collection, {
      "sync":  function() { this.render(); }
    });

    this.template = _.template(require(this.options.template));

    this.render();
  },

  render: function() {
    this.$el.html(this.template({
      collection: this.collection
    }));
    return this;
  }
});



module.exports = NotificationView;
