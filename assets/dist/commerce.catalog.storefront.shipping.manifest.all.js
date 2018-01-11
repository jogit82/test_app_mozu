(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.index = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  
  'http.commerce.catalog.storefront.shipping.requestRates.before': {
      actionName: 'http.commerce.catalog.storefront.shipping.requestRates.before',
      customFunction: require('./domains/commerce.catalog.storefront.shipping/http.commerce.catalog.storefront.shipping.requestRates.before')
  }
};

},{"./domains/commerce.catalog.storefront.shipping/http.commerce.catalog.storefront.shipping.requestRates.before":2}],2:[function(require,module,exports){
/**
 * Implementation for http.commerce.catalog.storefront.shipping.requestRates.before


 * HTTP Actions all receive a similar context object that includes
 * `request` and `response` objects. These objects are similar to
 * http.IncomingMessage objects in NodeJS.

{
  configuration: {},
  request: http.ClientRequest,
  response: http.ClientResponse
}

 * Call `response.end()` to end the response early.
 * Call `response.set(headerName)` to set an HTTP header for the response.
 * `request.headers` is an object containing the HTTP headers for the request.
 * 
 * The `request` and `response` objects are both Streams and you can read
 * data out of them the way that you would in Node.

 */
// Require the https library, which is already installed with Arc.js
var https = require('https');

// Require the flip-text library, which you must then install using 'npm install --save flip-text'. This command adds the library as a dependency in your package.json file.
var flipText = require('flip-text');


module.exports = function(context, callback) {


// Request an array of one random number from an online generator
https.get("https://qrng.anu.edu.au:443/API/jsonI.php?length=1&type=uint8", function(response) {
  
  // Process the response from the random number generator and place the 'data' value in 'result'
  var buf = '';
 
  response.on('data', function(chunk) {
    buf += chunk.toString();
  });

  response.on('error', callback);

  response.on('end', function() {

    var result = JSON.parse(buf);

 
    // Access the context of the 'http.commerce.catalog.storefront.shipping.requestRates.before' action to modify the shipping rates for the site
    context.response.body = {
        "resolvedShippingZoneCode": "United States",
        "shippingZoneCodes": [
          "United States",
          "Americas"
        ],
        "rates": [
          {
          "carrierId": "custom",
          "shippingRates": [
              {
                "code": "Rate1",
                "content": {
                  "localeCode": "usd",
                  "name": "Random Number"
                },
                // Use the random number (divided by 10 to filter larger numbers) as the first shipping amount
                "amount": result.data[0] / 10,
                "shippingItemRates": [],
                "customAttributes": [],
                "messages": [],
                "data":{test:"random", prop2:"object data"}
              },
              {
                "code": "Rate2",
                "content": {
                  "localeCode": "usd",
                  "name": "Number from Configuration"
                },
                // Use the 'shippingAmount' value from the action-level configuration data as the second shipping amount
                "amount": context.configuration.shippingAmount,
                "shippingItemRates": [],
                "customAttributes": [],
                "messages": [],
                "data":{test:"random", prop2:"object data"}
              },
                {
                "code": "Rate3",
                "content": {
                  "localeCode": "usd",
                  // Use the flip-text library to display shipping method label upside down
                  "name": flipText("Upside Down Number from Configuration")
                },
                // Use the 'shippingAmount2' value from the application-level configuration data as the third shipping amount
                "amount": context.configuration.shippingAmount2,
                "shippingItemRates": [],
                "customAttributes": [],
                "messages": [],
                "data":{test:"random", prop2:"object data"}
              }
            ],
            "customAttributes": []
          }
        ]
      };


      context.response.end();
     
      callback();
    });
  });
};
},{"flip-text":3,"https":undefined}],3:[function(require,module,exports){
var chars = require('./lib/chars')

Object.keys(chars).forEach(function (key) {
  var value = chars[key]
  if(!chars[value]) {
    chars[value] = key
  }
})

module.exports = function (str) {
  var result = ''
    , c = str.length
    , ch = ''
  for (; c >= 0; --c) {
    ch = str.charAt(c)
    result += chars[ch] || chars[ch.toLowerCase()] || ch
  }
  return result
}

},{"./lib/chars":4}],4:[function(require,module,exports){
module.exports = {
  // uppercase (incomplete)
  'A':'∀',
  'B':'𐐒',
  'C':'Ɔ',
  'E':'Ǝ',
  'F':'Ⅎ',
  'G':'פ',
  'H':'H',
  'I':'I',
  'J':'ſ',
  'L':'˥',
  'M':'W',
  'N':'N',
  'P':'Ԁ',
  'R':'ᴚ',
  'T':'⊥',
  'U':'∩',
  'V':'Λ',
  'Y':'⅄',

  // lowercase
  'a':'ɐ',
  'b':'q',
  'c':'ɔ',
  'd':'p',
  'e':'ǝ',
  'f':'ɟ',
  'g':'ƃ',
  'h':'ɥ',
  'i':'ᴉ',
  'j':'ɾ',
  'k':'ʞ',
  'm':'ɯ',
  'n':'u',
  'p':'d',
  'q':'b',
  'r':'ɹ',
  't':'ʇ',
  'u':'n',
  'v':'ʌ',
  'w':'ʍ',
  'y':'ʎ',

  // numbers
  '1':'Ɩ',
  '2':'ᄅ',
  '3':'Ɛ',
  '4':'ㄣ',
  '5':'ϛ',
  '6':'9',
  '7':'ㄥ',
  '8':'8',
  '9':'6',
  '0':'0',

  // special chars
  '.':'˙',
  ',':'\'',
  '\'':',',
  '"':',,',
  '`':',',
  '<':'>',
  '>':'<',
  '∴':'∵',
  '&':'⅋',
  '_':'‾',
  '?':'¿',
  '!':'¡',
  '[':']',
  ']':'[',
  '(':')',
  ')':'(',
  '{':'}',
  '}':'{'
};

},{}]},{},[1])(1)
});