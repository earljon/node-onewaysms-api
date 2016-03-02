var request = require('request');
var qs = require('qs');
var util = require('util');
var helpers = require('./string-helpers');

function OneWaySMS(config) {
	if (!(this instanceof OneWaySMS)) {
		return new OneWaySMS(config);
	}

	// Set the headers
	var headers = {
	    'User-Agent'	: 'OneWaySMS Gateway/1.0.0.'
	}

	this.headers = headers;
	this.apiusername = config.apiusername;
	this.apipassword = config.apipassword;
	this.endpoint = config.endpoint;
};

OneWaySMS.prototype.send = function send(sms, callback) {
	
	var numbers = util.isArray(sms.to) ? sms.to.join(',') : sms.to;

	var data = {
    	apiusername: this.apiusername,
    	apipassword: this.apipassword,   	
		senderid: sms.from,
    	mobileno: numbers,
    	languagetype: sms.ascii ? 1 : 2, 
    	message: sms.ascii ? sms.message : sms.message.toUnicodeSMS()
	}

    var query = toQueryParam(data);

	var options = {
	    url: this.endpoint + '/api.aspx?' + query,
	    method: 'GET',
	    headers: this.headers
	};
	
	//console.log(options.url);
	sendRequest(options, callback);	
};

OneWaySMS.prototype.status = function status(transactionId, callback) {
	var data = {
	    mtid: transactionId
	}

    var query = toQueryParam(data);

	var options = {
	    url: this.endpoint + '/bulktrx.aspx?' + query,
	    method: 'GET'
	}
	
	sendRequest(options, callback);
};

OneWaySMS.prototype.balance = function balance(callback) {
	var data = {
    	apiusername: this.apiusername,
    	apipassword: this.apipassword
	}

    var query = toQueryParam(data);

	var options = {
	    url: this.endpoint + '/bulkcredit.aspx?' + query,
	    method: 'GET'
	}
	
	sendRequest(options, callback);
};

function toQueryParam(jsonData) {
	var query = '';
	for(key in jsonData) {
	    query += key + '=' + jsonData[key] + '&';
	}
	query = query.slice(0, query.length - 1); 
	return query;
}

function sendRequest(options, callback) {

	function handleResponse(error, response, body) {
		if (!error && response.statusCode == 200) {
		  return callback(null, body);
		}
		return callback(error);
	}

  	request(options, handleResponse);
}

module.exports = OneWaySMS;
