
var hovering = false;
var paypalIframe = document.querySelector('iframe[title="Checkout with PayPal"]');

paypalIframe.addEventListener('mouseover', function () {
  hovering = true;
});

paypalIframe.addEventListener('mouseout', function () {
  hovering = false;
});

window.addEventListener('blur', function () {
  if (hovering) {
    window.dataLayer.push({
      'event': 'paypal_iframe_button_clicked'
    });

    setTimeout(function() {
      window.focus();
    }, 0);
  }
});
