;(function pollForPaypalButton() {
  var paypalIframe = document.querySelector('iframe[title="Checkout with PayPal"]');
  if (!paypalIframe) return setTimeout(pollForPaypalButton, 0);

  window.addEventListener('blur', function (e) {
    if (document.activeElement == paypalIframe) {
      console.log('paypal iframe was clicked');
    } else {
      console.log('paypal iframe was NOT clicked');
    }
  });
})();
