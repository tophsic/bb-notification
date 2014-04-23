/**
 *	@module notification/models/notification
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



NotificationModel = Backbone.Model.extend({
  defaults: function () {
    return {
      link: "",
      message: "This is an empty notification"
    };
  }

});

module.exports = NotificationModel;
