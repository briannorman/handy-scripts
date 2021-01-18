;(function poll() {
    // Wait for the button to exist
    if (!document.querySelector('a[href*="/buypage/"]')) return setTimeout(poll, 50);
    let buyButton = document.querySelector('a[href*="/buypage/"]');

    // Only observe class changes
    const config = { attributes: true, attributeFilter: ['class'] };

    // Callback function to execute when mutations are observed
    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
				buyButton.click();
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(buyButton, config);
})();
