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