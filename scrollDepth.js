var body = document.body,
    html = document.documentElement,
    windowHeight = window.innerHeight,
    fullPageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
    scrollableHeight = fullPageHeight - windowHeight,
    heightEvents = [
        {
            position: Math.round(scrollableHeight * 0.25),
            scrollPercent: '25',
        },
        {
            position: Math.round(scrollableHeight * 0.5),
            scrollPercent: '50',
        },
        {
            position: Math.round(scrollableHeight * 0.75),
            scrollPercent: '75',
        },
        {
            position: Math.round(scrollableHeight * 0.9),
            scrollPercent: '90',
        },
        {
            position: scrollableHeight,
            scrollPercent: '100',
        }
    ];

function checkScrollDepth() {
    var scrollPos = window.scrollY;

    // There's some trickery here, because we want to remove elements and that'll cause the
    // array to reindex as we iterate. We'd either have to adjust `i` each iteration or
    // we can just loop backwards. I prefer the latter.
    for (var i = heightEvents.length - 1; i >= 0; i--) {
        var thisEvent = heightEvents[i];

        if (scrollPos >= thisEvent.position) {
            dataLayer.push({
                'event': 'scroll_depth',
                'eventCategory': 'Scroll Depth',
                'eventAction': 'Scroll Down',
                'eventLabel': thisEvent.scrollPercent
            });

            heightEvents.splice(i, 1); // Remove once we've fired the event so it doesn't fire next time.
        }
    }

    // Once we're out of heightEvents we can stop listening.
    if (!heightEvents.length) {
        window.removeEventListener('scroll', checkScrollDepth);
    }
}

window.addEventListener('scroll', checkScrollDepth);
