/* GA Scroll Depth */
var body = document.body,
    html = document.documentElement,
    windowHeight = $(window).height(),
    fullPageHeight = Math.max( body.scrollHeight, body.offsetHeight,
                               html.clientHeight, html.scrollHeight, html.offsetHeight),
    scrollableHeight = fullPageHeight - windowHeight,
    quarterScrolledPos = Math.round(scrollableHeight * .25),
    halfScrolledPos = Math.round(scrollableHeight * .5),
    threeQuarterScrolledPos = Math.round(scrollableHeight * .75),
    quarterScrollSentToGA = false,
    halfScrollSentToGA = false,
    threeQuarterScrollSentToGA = false,
    fullScrollSentToGA = false;
function checkScrollDepth() {
  var scrollPos = $(document).scrollTop();
  if (scrollPos >= quarterScrolledPos) {
    if (!quarterScrollSentToGA) {
      sendScrollDepthToGa('25%');
      quarterScrollSentToGA = true;
    }
  }
  if (scrollPos >= halfScrolledPos) {
    if (!halfScrollSentToGA) {
      sendScrollDepthToGa('50%');
      halfScrollSentToGA = true;
    }
  }
  if (scrollPos >= threeQuarterScrolledPos) {
    if (!threeQuarterScrollSentToGA) {
      sendScrollDepthToGa('75%');
      threeQuarterScrollSentToGA = true;
    }
  }
  if (scrollPos === scrollableHeight) {
    if (!fullScrollSentToGA) {
      sendScrollDepthToGa('100%');
      fullScrollSentToGA = true;
    }
  }
}
function sendScrollDepthToGa(scrollHeight) {
  ga('send', 'event', 'Scroll Depth', 'scroll' + scrollHeight, urlPath);
}
$(window).on('scroll', checkScrollDepth);
/* END GA Scroll Depth */
