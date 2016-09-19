'use strict'

var page = require('page')
var pageRender = require('./page-render')

module.exports = function (options, pageRenderCallback) {
  var $container = $('#container')

  page('*', function (context, next) {
    var routeName = context.pathname.slice(0, -5)
    if (routeName === '') {
      routeName = '/index'
    }
    var specPath = '/api/speclate' + routeName + '.json'
    $container.addClass('loading')
    fetchSpec(specPath, function (err, pageSpec) {
      if (err) {
        $container.removeClass('loading')
        return options.error(err, $container)
      }

      if (context.init) {
                    // we should check the spec version here
                    // reset options to before /after functions are not passed in.
        pageRender(pageSpec, {}, pageRenderCallback)
      } else {
        pageRender(pageSpec, options, pageRenderCallback)
      }
      $container.removeClass('loading')
    })
  })
  page()
}

var fetchSpec = function (specUrl, callback) {
  fetch(specUrl).then(function (code) {
    return code.json()
  }).then(function (spec) {
    return callback(null, spec)
  }).catch(function (e) {
    return callback(e)
  })
}

