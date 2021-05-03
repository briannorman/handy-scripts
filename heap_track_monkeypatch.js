function log(logString) {
  console.log('%c' + logString, 'background-color: black; color: yellow');
}

if (window.heap.track) {
  var _track = window.heap.track;
  window.heap.track = function (eventName, eventProperties) {
    log('Heap eventName', eventName);
    log('Heap eventProperties: ', eventProperties);
    return _track.apply(this, arguments);
  };
}
