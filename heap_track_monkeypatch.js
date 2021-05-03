function log(logString) {
  console.log('%c' + logString, 'background-color: black; color: yellow');
}
if (window.heap.track) {
  var _track = window.heap.track;
  window.heap.track = function (element, options) {
    log('HEAP EVENT: Element: ' + element + ' | Options: ' + JSON.stringify(options));
    return _track.apply(this, arguments);
  };
}
