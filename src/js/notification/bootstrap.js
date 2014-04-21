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
