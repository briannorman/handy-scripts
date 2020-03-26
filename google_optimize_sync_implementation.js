/**
 * name is the experimentID
 * value is the variation
 */

;(function () {
    function doPjsThings() {
        console.log('this is some pseudo-PJS stuff that is unique to this experiment');
    }

    doPjsThings();

    const experimentID = 'JuBoY9ucSJugfN10NtF0DA';
    (function pollForGtag() {
        if (!window.gtag) return setTimeout(pollForGtag, 50);

        function initExperiment(name, value) {
            if (value === '0') {
                // v0 code
            } else if (value === '1') {
                // v1 code
            } else if (value === '2') {
                // v2 code
            }
            console.log('Experiment ' + name + ' has activated variation ' + value);

        }

        gtag('event', 'optimize.callback', {
            name: experimentID,
            callback: initExperiment
        });
    })();
})();
