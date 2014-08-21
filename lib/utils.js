'use strict';

var xml2js = require('xml2js');

/**
 * merge helper function to merge objects
 * @param  {Object} defaults
 * @param  {Object} options
 * @return {Object}
 */
module.exports.merge = function (defaults, options) {
    defaults = defaults || {};
    if (options && typeof options === 'object') {
        var i = 0,
        keys = Object.keys(options);

        for (i = 0; i < keys.length; i += 1) {
            if (options[keys[i]] !== undefined) {
                defaults[keys[i]] = options[keys[i]];
            }
        }
    }
    return defaults;
};

/**
 * ParseXML wrapper function to the xml2js parseString function
 * @param  {String} xml XML string to be converted to object
 * @param  {Function} cb Callback function
 */
module.exports.parseXML = function (xml, cb) {
    xml2js.parseString(xml, function(err, result){
        cb(err, result);
    });
};

/**
 * toXML wrapper function to the xml2js parseString function
 * @param  {Object} object Object to be converted to XML
 * @return {String}
 */
module.exports.toXML = function (object) {
    var builder = new xml2js.Builder();
    return builder.buildObject(object);
};
