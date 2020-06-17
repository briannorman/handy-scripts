if (window.utag.track) {
	var _track = window.utag.track;
	window.utag.track = function (element, options) {
		console.log('Tealium Element: ', element);
		console.log('Tealium Options: ', options);
		if (options.tealium_event === 'LeadEvent' && options.event === 'leadResumed') {
			// we might need to use the tealium_event below
			// if (options.tealium_event === 'LoginEvent') {
			console.log('Tealium login event!');
			// TODO fire Optimizely event
		}
		return _track.apply(this, arguments);
	};
}
