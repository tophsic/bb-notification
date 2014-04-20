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

Notification.prototype.initialize = function(options) {
	// Options de base
	this.options = options;

	if (!this.options.url) {
		throw new Error('Url must be set to use notifications');
	}
};



module.exports = Notification;
