/**
 *	@module notification/models/notification
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var Model = require('notification/models/notification');



NotificationCollection = Backbone.Collection.extend({
  model: Model,

  defaults: {
    url: null
  },

  initialize: function(models, options) {
    this.options = options;

    _.defaults(this.options, this.defaults);

    if (!this.options.url) {
      throw new Error('Url must be set');
    }

    this.url = this.options.url;
  }
});

module.exports = NotificationCollection;
