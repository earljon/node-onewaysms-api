# node-onewaysms-api

A NodeJS based API wrapper implementation for OneWaySMS SMS Gateway provider.

## Installation

	npm install node-onewaysms-api

## Usage

### Initialize the API:

	var OneWaySMS = require('node-onewaysms-api');

	var config = {
		endpoint: "ex: http://gateway.onewaysms.ph:10001",
		apiusername: "ex: API_USERNAME",
		apipassword: "ex: API_USERPASSWORD"
	};
	var sms = new OneWaySMS(config);

	function handleResult(error, result) {
		if (error) {console.log(error); return};
		console.log(result);
	}

### Compose and send a normal SMS payload:
	// You can include more numbers separated by a comma
	var numbers = ['09178009900'];

	var normalText = "God is good, all the time.";
	var payload = {
		from: 'TEST',
		to: numbers,
		message: normalText,
		ascii: true
	};

	sms.send(payload, handleResult);

### Compose and send a Unicode encoded SMS payload:
	var unicodeText = "神は、すべての時間良いです";
	var payload = {
		from: 'TEST',
		to: numbers,
		message: unicodeText,
		ascii: false
	};

	sms.send(payload, handleResult);

### Check the transaction Id of the message:

	var transactionId = '1603020018593';
	sms.status(transactionId, handleResult);

### Check your credit balance:

	sms.balance(handleResult);

## Revision History

* 1.0.0 - Initial Release

## Copyright
MIT