/**
 * waitForElement
 * @param {string} selector 
 * @returns a promise with the first matching element
 */
function waitForElement(selector) {
  return new Promise(function(resolve, reject) {
    var element = document.querySelector(selector);

    if(element) {
      resolve(element);
      return;
    }

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for(var node of nodes) {
          if(node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        };
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}

/**
 * Example Usage:
 */
waitForElement('.hey-brian').then(function(el) {
    console.log('hey brian el', el)
});

setTimeout(function() {
    let div = document.createElement('div');
    div.classList.add('hey-brian');
    document.body.appendChild(div);
}, 2500);
