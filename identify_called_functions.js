// Monkey-patch all functions on the given object so they'll log when called.
// ignoreKeys is an array that'll skip monkey-patching any keys it contains.
function injectFeelers(obj, ignoreKeys = []) {
  // For all keys on the Object.
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
      // IIFE to retain variable references between iterations.
      (function() { // jshint ignore:line
        var funcName = keys[i];
        var _func = obj[funcName];
        obj['_' + funcName] = _func;

        // Only if this key is a function.
        if(typeof _func === 'function') {
          // Skip ignored keys.
          if (Array.isArray(ignoreKeys) && !ignoreKeys.includes(funcName) ) {
            console.log('Monkey Patching - ', funcName, _func);
            // console.log('Old Func: ', _func);
            obj[funcName] = function() { // jshint ignore:line
              console.log('Executing: ' + funcName, _func);
              return _func.apply(this, arguments);
            };
            // console.log('New Func: ', obj[funcName]);
          }
        }
      })();
  }
}
