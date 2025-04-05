console.log('%cEvolv Target Listener Active', 'font-weight: 700; color: orange');

(function () {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        if (url.includes('/v1/delivery')) {
            this.addEventListener('load', function () {
                try {
                    const response = JSON.parse(this.responseText);
                    const options = response?.execute?.pageLoad?.options;

                    if (!options) return;

                    const activities = options.map(option => ({
                        Activity_Name: option.responseTokens?.['activity.name'],
                        Experience_Name: option.responseTokens?.['experience.name'],
                        Experience_Content: option.content?.[0]?.content || "(Empty)"
                    }));

                    console.log('%cEvolv Target Listener', 'font-weight: 700; color: orange', { activities });
                } catch (error) {
                    console.warn('Failed to parse response for Evolv Target Listener:', error);
                }
            });
        }

        originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        originalSend.apply(this, arguments);
    };
})();
