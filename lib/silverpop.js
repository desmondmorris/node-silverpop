'use strict';

var utils = require('./utils');
var http = require('request');
var querystring = require('querystring');

/**
 * Silverpop constructor
 * @param  {Object} options
 */
var Silverpop = function(options) {
    var defaults = {
        pod: 1
    };
    var options = utils.merge(defaults, options);
    this.endpoint = 'http://api' + options.pod + '.silverpop.com/XMLAPI';
};

module.exports = Silverpop;

/**
 * Request POST request against Silverpop API
 * @param  {String} xml XML payload
 * @param  {session} session session id
 * @param  {function} cb callback function
 * @return {String}
 */
Silverpop.prototype.request = function(params, session, cb){
    var endpoint = this.endpoint;
    if (typeof session === 'function') {
        cb = session;
        session = null;
    }
    if (typeof session === 'string') {
        endpoint += session;
    }
    var form = {
        form: 'xml=' + utils.toXML(params)
    }
    request.post(endpoint, form, function(err, resp, body){
        utils.parseXML(body, function (err, result) {
            if(result.Envelope.Body[0].RESULT[0].SUCCESS[0] === "true") {
                cb(null, result);
            }
            else {
                cb(true, result);
            }
        });
    });
};
