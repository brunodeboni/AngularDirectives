/**
 * This class is designed to work in a form with a scope variable of type Trade
 */

myApp.directive('financeInput', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			trade: '='
		},

		/*	controller: function ($scope, $element, $attrs) {
		 this.errorMessage = ""
		 },*/
		link: function (scope, element, attrs, ctrl, ngModel) {

			/**
			 *
			 * @param string This is an arbritary string from an input that could contain anything, ie from a key press or copy paste/
			 * todo investigate where to prevent unwanted key presses at the input level, but since we need to remove auto generated commas we will stick with this approach for now
			 * @returns {Number}
			 */
			function convertInputStringToFloat(string) {
				//get rid of non numeric input
				return parseFloat(string.replace(/[^\d.]/g, ''));
			}


			//var errorMessage = "";

			// we listen to keyboard inputs to multiple amounts (this makes it more simple)
			element.bind("keyup", function (evt) {
				if (evt.keyCode == 75) {
					var inputVal = element.val();
					inputVal = convertInputStringToFloat(inputVal);
					var parsedVal = parseFloat(inputVal);
					var final = parsedVal * 1000;
					if (final > maxValue) {
						element.val(max);
					}
					else {
						element.val(addCommas(final));
					}
				}

				if (evt.keyCode == 77) {
					inputVal = element.val();
					inputVal = convertInputStringToFloat(inputVal);
					parsedVal = parseFloat(inputVal);
					final = parsedVal * 1000000;
					if (final > maxValue) {
						element.val(max);
					}
					else {
						element.val(addCommas(final));
					}
				}

				if (evt.keyCode == 66) {
					inputVal = element.val();
					inputVal = convertInputStringToFloat(inputVal);
					parsedVal = parseFloat(inputVal);
					final = parsedVal * 1000000000;
					if (final > maxValue) {
						element.val(max);
					}
					else {
						element.val(addCommas(final));
					}
				}
			});

			//we perform some validation after the user has finished inputing a value
			element.bind("blur", function (evt) {

				var inputVal = convertInputStringToFloat(element.val());
				parsed = parseFloat(inputVal).toString();
				//clear ending zeros
				element.val(addCommas(parsed));

			});

			/**
			 * Adds commas to integer part of input string
			 * note, you can test a "well formed" numeric string with the regex: /(([1-9][,.]?){10})/ but I feel its safer to work with a number primative =
			 * @param inputVal
			 * @returns {string}
			 */
			function addCommas(inputVal) {
				//сonvert to string
				inputVal = inputVal.toString();


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
				return res;
			}

			function testForOverPrecision(numericVal) {
				return (numericVal.toString().length + 1) > scope.trade.maxPrecision;

				//takes a string instead of a nunmber, the former seems more elegant/safe
				//	if (numericVal.replace(/[^1-9]/g, "").length > 10) {
				//numericVal = numericVal.match(/(([1-9][,.]?){10})/).shift();
			}

			return ctrl.$parsers.push(function (inputValue) {
				var originalVal = element.val();

				//I find it easier to work with a parsed number
				var numericVal = convertInputStringToFloat(originalVal);


				if (testForOverPrecision(originalVal)) {
					//todo valid
					//errorMessage = "max precision: " + scope.trade.maxPrecision;
					//	ngModel();
				}

				var res = addCommas(numericVal);
				if (res != inputValue) {
					ctrl.$setViewValue(res);
					ctrl.$render();
				}
			});

		}
	};
});