'use strict';

var page = require('page');
var speclate = require('speclate');
var pageRender = require('./page-render')

module.exports = function(options, pageRenderCallback) {

        page('*', function(context, next) {

            var routeName = context.pathname.slice(0, -5)

            if (routeName === '') {
                routeName = '/index';
            }
            var specPath = '/api/speclate' + routeName + '.json';

            fetchSpec(specPath, function(err, pageSpec) {

                if (!context.init) {
                     pageRender(pageSpec, options, pageRenderCallback);
                }
            });
        });
        page();
};


var fetchSpec = function(specUrl, callback) {

    var request = new Request(specUrl, {
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    fetch(request).then(function (code) {
        return code.json()
    }).then(function (spec) {
        return callback(null, spec);
    }).catch((e) => {
        return callback(e)
    })
};

