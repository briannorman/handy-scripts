var dataLayer = window.dataLayer.push;
window.dataLayer.push = function (element, options) {
  var dlEventName = element.event;
  var logString = 'GTM dataLayer event: ' + dlEventName;
  console.log('%c' + logString, 'background-color: yellow; color: blue');

  return dataLayer.apply(this, arguments);
};
