require.register('notification', function(exports, require, module) {
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

});
require.register('notification/bootstrap', function(exports, require, module) {
/**
 *	Bootstrap de baobab.
 *
 *	@module baobab/baobab
 *	@author Félix Girault <felix@vtech.fr>
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



/**
 *	Templates mustache.
 */
_.templateSettings = {
	interpolate : /\{\{([\s\S]+?)\}\}/g,
	evaluate : /\{%([\s\S]+?)%\}/g,
	escape : /\{-([\s\S]+?)-\}/g
};



/**
 *	Fixe un bug de scope dans les templates compilées.
 *	Sinon, on mange une erreur `undefined '_' ...`.
 */
var template = _.template;

_.template = function(text, data, options) {
	return template(text, data, _.merge({
		imports: { '_': _ } // on rend '_' disponible dans les templates
	}, options));
}



/**
 *	Méthodes additionnelles pour underscore.
 */
_.mixin({

	/**
	 *	Et que s'appelorio...
	 *	Supprime les valeurs vides d'un objet.
	 *
	 *	@param {object} object - Objet à filtrer.
	 *	@return {object} - Objet filtré.
	 */
	quezac: function(object) {
		_.each(object, function(value, key) {
			if (!value) {
				delete object[key];
			}
		});

		return object;
	},

	/**
	 *	Convertit un nombre d'octet en une chaîne lisible.
	 *
	 *	@see http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
	 *	@param {int} bytes - Taille en octets.
	 *	@return {string} - Taille en chaîne.
	 */
	rozana: function(bytes) {
		if (!bytes) {
			return '';
		}

		var sizes = ['o', 'ko', 'Mo', 'Go', 'To'];
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

		return Math.round(bytes / Math.pow(1024, i)).toPrecision(3) + ' ' + sizes[i];
	}
});



/**
 *
 */
Backbone.$ = $;



/**
 *	Émulation des types de requêtes "avancés" (PUT etc).
 */
Backbone.emulateHTTP = true;
Backbone.emulateJSON = false;

});
require.register('notification/collections/notification', function(exports, require, module) {
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
    this.constructor.__super__.initialize.call(this, models, options);
    this.options = options;

    _.defaults(this.options, this.defaults);

    if (!this.options.url) {
      throw new Error('Url must be set');
    }

    this.url = this.options.url;
  }
});

module.exports = NotificationCollection;

});
require.register('notification/models/notification', function(exports, require, module) {
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

});
require.register('notification/views/item', function(exports, require, module) {
/**
 *  @module notification/views/item
 */
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');



var ItemView = Backbone.View.extend({
  template: _.template(require('notification/templates/item')),

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

});
require.register('notification/views/items', function(exports, require, module) {
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

    this.$('ul').html(content);
  }
});



module.exports = ItemsView;

});
require.register('notification/views/notification', function(exports, require, module) {
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

});
require.register('notification/templates/item', function(exports, require, module) {
module.exports = "<li class=\"notification-item\">\n<div class=\"progress\">\n    <span class=\"total\"><span class=\"in-progress\"></span></span>\n</div>\n<div class=\"message {{status}}\">{{message}}</div>\n</li>	\n"
});
require.register('notification/templates/items', function(exports, require, module) {
module.exports = "<ul class=\"notification-items\">\n</ul>	\n"
});
require.register('notification/templates/notification', function(exports, require, module) {
module.exports = "<div class=\"notification{% if (collection.length !== 0) {%} notify{%}%}\">\n</div>\n"
});