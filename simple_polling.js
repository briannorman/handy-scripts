var safetyNet = 0;
function poll() {
	// break if we haven't found the thing after 2.5 seconds
	if (safetyNet++ > 50) return;

    var el = document.querySelector('.my-selector');
    if (!el) return setTimeout(poll, 50);

    el.textContent = 'cheeseburger';
};

poll();
