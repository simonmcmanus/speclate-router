'use strict';

var superagent = require('superagent');

module.exports = function(file, callback) {

    superagent.get( window.location.origin +  file )
    .end(function(err, res) {

        if(err) {
            return callback(err)
        }
        if(res.ok) {
            callback(null, res.text); // passing null error param to keep same interface as fs.readfile.
        }else {
            callback(res.body);
        }
    });
};
