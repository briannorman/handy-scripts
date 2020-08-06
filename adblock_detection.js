;
(function poll() {
	if (document.readyState !== 'complete') return setTimeout(poll, 50);

	console.log('doc ready!');
	if (!window.gaData) {
		console.log('adblocker detected');

		// hit a server-side endpoint that triggers an offline event to be sent to segment

	} else {
		console.log('no adblocker');
	}
})();
