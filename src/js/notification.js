/**
 *  @module notification/notification
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



/**
 *  Bootstrapping de baobab: configuration d'underscore et backbone.
 */
require('notification/bootstrap');



var Notification = function(options) {
  this.initialize.apply(this, arguments);
};

Notification.prototype.defaults = {
  url: null,
  timeout: 10000,
  collection: 'notification/collections/notification',
  model: 'notification/models/notification',
  notification: {
    el: null,
    view: 'notification/views/notification',
    template: 'notification/templates/notification'
  },
  items: {
    el: null,
    view: 'notification/views/items',
    template: 'notification/template/items',
    item: {
      view: 'notification/views/item',
      template: 'notification/template/item',
    }
  }
};

Notification.prototype.initialize = function(options) {
  this.options = _.clone(this.defaults);
  this.options = _.merge(this.options, options);

  if (!this.options.url) {
    throw new Error('Url must be set to use notifications');
  }

  if (!this.options.notification.el) {
    throw new Error('El must be set to use notifications');
  }

  var Collection        = require(this.options.collection),
      NotificationView  = require(this.options.notification.view),
      ItemsView         = require(this.options.items.view)
      ;

  this.collection = new Collection([
      require(this.options.model)
  ], {
    url: this.options.url
  });

  this.notification = new NotificationView({
    el: this.options.notification.el,
    template: this.options.notification.template,
    collection: this.collection
  });

  this.items = new ItemsView({
    el: this.options.items.el,
    template: this.options.items.template,
    collection: this.collection,
    items: this.options.items.item
  });
};

Notification.prototype.listen = function() {
  var app = this;

  this.collection.fetch();

  setTimeout(function() {
    app.listen();
  }, app.options.timeout);
}



module.exports = Notification;
