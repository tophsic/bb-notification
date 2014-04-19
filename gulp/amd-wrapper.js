<% var name = name || path.basename(obj.file.path, '.js'); %>

require.register('<%= name %>', function(exports, require, module) {
	var define = function(deps, factory) {
		if (factory === undefined) {
			module.exports = deps();
		} else {
			var modules = [];

			require('underscore').each(deps, function(dep) {
				// fix pour les paths qui commencent par ./ dans jquery.fileupload
				if (dep.substring(0, 2) == './') {
					dep = dep.substring(2);
				}

				try {
					modules.push(require(dep));
				} catch (e) {
					console.log('Impossible de charger le module `' + dep + '`');
					modules.push(undefined);
				}
			});

			module.exports = factory.apply(this, modules);
		}
	};

	define.amd = true;

	// inclusion du module avec un contexte particulier
	<% if ('context' in obj) { %>
		var __context = require('<%= context %>');
		var __factory = function() {
			<%= contents %>
		};

		__factory.apply(__context);

	// inclusion du module
	<% } else { %>
		<%= contents %>
	<% } %>
});
