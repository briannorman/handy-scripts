var history = {};

function handleWindowUnloadEvent() {
	function hasFormSubmissionOccurredOnPage() {
		var doesFormSubmitDatalayerEventExist = false;
		window.dataLayer.forEach(function (dlObject) {
			if (dlObject.event === 'formSubmission') {
				doesFormSubmitDatalayerEventExist = true;
			}
		});
		return doesFormSubmitDatalayerEventExist;
	}

	function isFormSubmitEvent(e) {
		if (e) {
			return e.event === 'formSubmission';
		} else {
			return false;
		}
	}

	function getFormName(e) {
		return e['gtm.element'].name;
	}

	function findFormFromHistory(name) {
		return {
			name: name,
			history: (history[name] || [])
		};
	}

	function notEmpty(form) {
		return form.history.length > 0;
	}

	function hasNoFormSubmitEvent(dataLayer) {
		return function (name) {
			return dataLayer.filter(isFormSubmitEvent).map(getFormName).indexOf(name) === -1;
		};
	}

	function findUnsubmittedForms() {
		var historyKeys = Object.keys(history);
		var filteredKeys = historyKeys.filter(hasNoFormSubmitEvent(window.dataLayer));
		var mappedKeys = filteredKeys.map(findFormFromHistory);
		var returnValue = mappedKeys.filter(notEmpty);
		return returnValue;
	}

	window.addEventListener('beforeunload', function () {
		var unsubmittedForms = findUnsubmittedForms();

		unsubmittedForms.forEach(function (unsubmittedForm) {
			if (unsubmittedForm.history) {
				if (!hasFormSubmissionOccurredOnPage()) {
					window.dataLayer.push({
						'event': 'formAbandonment',
						'eventCategory': 'Form Interaction',
						'eventAction': 'Form Abandonment',
						'eventLabel': unsubmittedForm.history.join(' > ')
					});
				}
			}
		});
	});
}

function handleInputHistory() {
	document.addEventListener("change", function (e) {
		var target = e.target;
		if (target && target.tagName && (target.tagName.toUpperCase() === "INPUT" || target.tagName.toUpperCase() === "TEXTAREA" || target.tagName.toUpperCase() === "SELECT")) {
			var inputLabel = target.parentElement.querySelector('label');
			if (inputLabel) {
				var inputLabelText = inputLabel.textContent;
				var form = target.form;
				if (form && inputLabelText) {
					var formName = form.getAttribute("name");
					if (typeof history[formName] === "undefined") {
						history[formName] = [];
					}
					if (history[formName].slice(-1) !== inputLabelText) {
						history[formName].push(inputLabelText);
					}
				}
			}
		}
	});
}

function nameTheUnnamedForms() {
	var pageForms = document.querySelectorAll('form');
	var formCounter = 0;
	pageForms.forEach(function (form) {
		if (form.getAttribute('name') === null || form.getAttribute('name') === undefined) {
			var formCountString = 'form-' + formCounter.toString();
			form.setAttribute('name', formCountString);
			formCounter++;
		}
	});
}

nameTheUnnamedForms();
handleInputHistory();
handleWindowUnloadEvent();
