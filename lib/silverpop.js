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

    this.sessionid = null;
    this.endpoint = 'http://api' + options.pod + '.silverpop.com/XMLAPI';

};
module.exports = Silverpop;

/**
 * Request POST request against Silverpop API
 * @param  {String} xml XML payload
 * @param  {String} session session id
 * @param  {function} cb callback function
 */
Silverpop.prototype.request = function(params, session, cb){
    var endpoint = this.endpoint;
    if (typeof session === 'function') {
        cb = session;
        session = null;
    }
    if (typeof session === 'string') {
        endpoint += ';jsessionid=' + session;
    }

    var payload = {
      Envelope: {
        Body: params
      }
    }

    var form = {
        form: 'xml=' + utils.toXML(payload)
    }

    http.post(endpoint, form, function(err, resp, body){
        utils.parseXML(body, function (err, result) {
            result = utils.arrayClean(result);
            if (result.Envelope.Body == '') {
              cb(
                  new Error('Invalid request'),
                  result
              );
            }
            else if(typeof result.Envelope.Body.RESULT != 'undefined') {

                if (result.Envelope.Body.RESULT.SUCCESS == 'false') {
                  cb(
                      new Error(result.Envelope.Body.Fault.FaultString),
                      result
                  );
                }
                else {
                    cb(null, result);
                }
            }
        });
    });
};

/**
 * Login helper function for login
 * @param  {String} username
 * @param  {String} password
 * @param  {function} cb callback function
 */
Silverpop.prototype.login = function(username, password, cb){
  var req = {
      Login: {
          USERNAME: username,
          PASSWORD: password
      }
  };
  this.request(req, function(err, data) {
    if (err) {
      cb(err, data);
    }
    else {
      cb(err, data.Envelope.Body.RESULT.SESSIONID);
    }
  });
};

/**
 * Logout helper function for logout
 * @param  {String} session
 * @param  {function} cb callback function
 */
Silverpop.prototype.logout = function(session, cb){
  var req = {Logout: null};
  this.request(req, session, function(err, data) {
    cb(err, data);
  });

};
