'use strict';

var page = require('page');
var speclate = require('speclate');
var pageRender = require('./page-render')


module.exports = function(options, pageRenderCallback) {

        page('*', function(context, next) {

            var routeName = context.pathname.slice(0, -5)
console.log('in router')
            if (routeName === '') {
                routeName = '/index';
            }
            var specPath = '/api/speclate' + routeName + '.json';

            fetchSpec(specPath, function(err, pageSpec) {

                if (err) {
                    return console.log('err', err);
                }

                $('#container').addClass('fadeIn')
                if (context.init) {
                    // we should check the spec version here
                    // reset options to before /after functions are not passed in.
                    pageRender(pageSpec, {}, pageRenderCallback);

                } else {
                    pageRender(pageSpec, options, pageRenderCallback);

                }
            setTimeout(function() {
                  $('#container').removeClass('fadeIn')
            }, 300);


            });
        });
        page();
};


var fetchSpec = function(specUrl, callback) {
    fetch(specUrl).then(function (code) {
        return code.json()
    }).then(function (spec) {
        return callback(null, spec);
    }).catch((e) => {
        return callback(e)
    })
};

