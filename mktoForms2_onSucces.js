;(function pollForMkto() {
	var mktoForms2 = window.MktoForms2;
	if (!mktoForms2) return setTimeout(pollForMkto, 50);

	mktoForms2.allForms().forEach(function (form) {
		form.onSuccess(function () {
			if (form.getId() === 1039) {
				window.dataLayer.push({
					'event': 'marketo_demo_form_submission'
				});
			} else if (form.getId() === 1040) {
				window.dataLayer.push({
					'event': 'marketo_contact_us_form_submission'
				});
			} else if (form.getId() === 1557) {
				window.dataLayer.push({
					'event': 'marketo_free_trial_form_submission'
				});
			} else if (form.getId() === 1214) {
				window.dataLayer.push({
					'event': 'marketo_free_trial_form_submission'
				});
			}
		});
	});
})();
