function log(logString) {
	console.log('%c' + logString, 'background-color: black; color: yellow');
}
if (window.analytics.track) {
	var _track = window.analytics.track;
	window.analytics.track = function (element, options) {
		log('Name: ' + element + ' | Data: ' + JSON.stringify(options));
		return _track.apply(this, arguments);
	};
}
