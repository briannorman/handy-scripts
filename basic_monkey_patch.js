var _originalFunction = window.someFunction;
window.someFunction = function (element, options) {
	// do the thing 



	return _originalFunction.apply(this, arguments);
};
