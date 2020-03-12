;(function pollForPaypalButton() {
  var paypalIframe = document.querySelector('iframe[title="Checkout with PayPal"]');
  if (!paypalIframe) return setTimeout(pollForPaypalButton, 0);

  window.addEventListener('blur', function (e) {
    if (document.activeElement == paypalIframe) {
		window.dataLayer.push({
			'event': 'paypal_iframe_button_clicked'
		  });
    }
  });
})();
