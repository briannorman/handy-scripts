;(function poll() {
    var el = document.querySelector('.my-selector');
    if (!el) return setTimeout(poll, 50);

    el.textContent = 'cheeseburger';
})();
