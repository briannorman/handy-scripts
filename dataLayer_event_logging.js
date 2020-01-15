// might need to change `gtmDataLayer` to `dataLayer`
var _gtmDataLayerPush = window.gtmDataLayer.push;
window.gtmDataLayer.push = function (element, options) {
  var dlEventName = element.event;
  var logString = 'GTM dataLayer event: ' + dlEventName;
  console.log('%c' + logString, 'background-color: yellow; color: blue');

  return _gtmDataLayerPush.apply(this, arguments);
};
