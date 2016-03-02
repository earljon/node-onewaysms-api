function padLeft(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
};

function toHex(str) {
	return (str+0).toString(16).toUpperCase();
};

function toHexNCR (argstr, enableFormatting ) {
  	var outputString = "";
  	argstr = argstr.replace(/^\s+/, '');

	if (argstr.length == 0) { return ""; }
	argstr = argstr.replace(/\s+/g, ' ');
	  
	var listArray = argstr.split(' ');

	for ( var i = 0; i < listArray.length; i++ ) {
		var n = parseInt(listArray[i], 16);
		if (enableFormatting) {
			outputString += '&#x' + toHex(n) + ';';	
		} else
			outputString += padLeft(toHex(n), 4);
	}
	return (outputString);
};

// http://www.endmemo.com/unicode/unicodeconverter.php
String.prototype.toUnicodeSMS = function toUnicodeSMS () { 
	var str = String(this);
	var haut = 0;
	var n = 0;
	var data = '';
	var dataHex = '';

	for (var i = 0; i < str.length; i++) {
		var b = str.charCodeAt(i); 
		if (b < 0 || b > 0xFFFF) {
			data += 'Error ' + toHex(b) + '!';
		}
		if (haut != 0) {
			if (0xDC00 <= b && b <= 0xDFFF) {
				dataHex = 0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00);
				data += toHex(dataHex) + ' ';
				haut = 0;
				continue;
			} else {
				data += '!error ' + toHex(haut) + '!';
				haut = 0;
			}
		}
		if (0xD800 <= b && b <= 0xDBFF) {
			haut = b;
		} else {
			data += toHex(b) + ' ';
		}
	}

	data = data.substring(0, data.length-1);
	return toHexNCR(data, false);
}