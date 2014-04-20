/**
 *	@module notification/notification
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



/**
 *	Bootstrapping de baobab: configuration d'underscore et backbone.
 */
require('notification/bootstrap');



var Notification = function(options) {
	options || (options = {});
	this.initialize.apply(this, arguments);
};

Notification.prototype.defaults = {
  url: null
};

Notification.prototype.initialize = function(options) {
  this.options = options;
   _.defaults(this.options, this.defaults);

	if (!this.options.url) {
		throw new Error('Url must be set to use notifications');
	}
};



module.exports = Notification;
