<% var name = name || path.basename(obj.file.path, '.js'); %>

require.register('<%= name %>', function(exports, require, module) {
	<%= contents %>
});
