/**
 * This is a scaffold for unit tests for the custom function for
 * `http.commerce.catalog.storefront.shipping.requestRates.before`.
 * Modify the test conditions below. You may:
 *  - add special assertions for code actions from Simulator.assert
 *  - create a mock context with Simulator.context() and modify it
 *  - use and modify mock Mozu business objects from Simulator.fixtures
 *  - use Express to simulate request/response pairs
 */

'use strict';

// Require the 'mozu-action-simulator', which provides a mock context to test your Arc.js application before you upload it to Platform Manager
var Simulator = require('mozu-action-simulator');
var assert = Simulator.assert;

describe('http.commerce.catalog.storefront.shipping.requestRates.before', function () {

  var action;

  before(function () {
    action = require('../src/domains/commerce.catalog.storefront.shipping/http.commerce.catalog.storefront.shipping.requestRates.before');
  });

  it('runs successfully', function(done) {

    // Specify a sufficient timeout for the random number generator to return a response
    this.timeout(10000);

    var responseEndCalled = false;

    // For testing purposes, provide the configuration data that you will set in the Action Management JSON editor
    var context = Simulator.context('http.commerce.catalog.storefront.shipping.requestRates.before', callback);
    context.configuration = { shippingAmount : 17};
    context.configuration = { shippingAmount2 : 25};

    var callback = function(err) {
      
      // Confirm that the data you access through the context argument matches your assumed structure
      assert(!err, "Callback was called with an error: " + err);
      assert(responseEndCalled, "The action never called context.response.end() as we expected.");
      assert(context.response.body, "No body set on context.response.");

      var body = context.response.body;

      assert(Array.isArray(body.rates), "body.rates is not an array");

      assert.equal(body.rates.length, 1, 'body.rates was supposed to have 1 entries, it had ' + body.rates.length);

      body.rates.forEach(function(rate) {
        assert(Array.isArray(rate.shippingRates), "rate.shippingRates is not an array");
      assert.equal(rate.shippingRates.length, 3, 'rate.shippingRates was supposed to have 3 entries, it had ' + rate.shippingRates.length);
        assert(rate.shippingRates[0].amount > 0 && rate.shippingRates[0].amount < 65535, "Random number is out of range: " + rate.shippingRates[0].amount) 
      });

      done();
    };



    context.response.end = function() {
      responseEndCalled = true;
    };

    // modify context as necessary

    /*
     the request/response pair will be a static mock.
     if you need an actual stream, use http!
     example:
     
     var http = require('http');
     var server = http.createServer(function(req, res) {
      context.request = req;
      context.response = res;
      assert(Simulator.simulate('http.commerce.catalog.storefront.shipping.requestRates.before', action, context, callback));
     }).listen(9000);
     http.get('http://localhost:9000/', function(req, res) {
      // add the request body here
     });
    */

    Simulator.simulate('http.commerce.catalog.storefront.shipping.requestRates.before', action, context, callback);
  });
});