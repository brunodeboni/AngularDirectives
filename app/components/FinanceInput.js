myApp.directive('financeInput', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {

			function clean(numericString) {
				//get rid of non numeric input
				return numericString.replace(/[^\d.]/g, '');
			}

			element.bind("keyup", function (evt) {
				if (evt.keyCode == 75) {
					var inputVal = element.val();
					inputVal = clean(inputVal);
					var parsedVal = parseFloat(inputVal);
					var final = parsedVal * 1000;
					if (final > 1000000000) {
						element.val(999999999);
					}
					else {
						element.val(final);
					}
				}

				if (evt.keyCode == 77) {
					var inputVal = element.val();
					inputVal = clean(inputVal);
					var parsedVal = parseFloat(inputVal);
					var final = parsedVal * 1000000;
					if (final > 1000000000) {
						element.val(999999999);
					}
					else {
						element.val(final);
					}
				}

				if (evt.keyCode == 66) {
					var inputVal = element.val();
					inputVal = clean(inputVal);
					var parsedVal = parseFloat(inputVal);
					var final = parsedVal * 1000000000;
					if (final > 1000000000) {
						element.val(999999999);
					}
					else {
						element.val(final);
					}
				}
			});

			return ctrl.$parsers.push(function (inputValue) {
				var inputVal = element.val();

				//clear trailing zeros
				while (inputVal.charAt(0) == '0') {
					inputVal = inputVal.substr(1);
				}

				//get rid of bad input
				inputVal = clean(inputVal);

				//we now have pure number, test for precision and remove least significant digit
				if (inputVal.replace(/[^0-9]/g, "").length > 10) {
					inputVal = inputVal.match(/(([0-9][,.]?){10})/).shift();
				}



				var decimalSplit = inputVal.split(".");
				var intPart = decimalSplit[0];
				var decPart = decimalSplit[1];

				if (intPart.length > 3) {
					var intDiv = Math.floor(intPart.length / 3);
					while (intDiv > 0) {
						var lastComma = intPart.indexOf(",");
						if (lastComma < 0) {
							lastComma = intPart.length;
						}
						if (lastComma - 3 > 0) {
							intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
						}
						intDiv--;
					}
				}

				if (decPart === undefined) {
					decPart = "";
				}
				else {
					decPart = "." + decPart;
				}
				var res = intPart + decPart;

				if (res != inputValue) {
					ctrl.$setViewValue(res);
					ctrl.$render();
				}
			});

		}
	};
});