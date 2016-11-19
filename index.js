'use strict'

var page = require('page')
var pageRender = require('./page-render')

module.exports = function (routerOptions, speclateOptions, pageRenderCallback) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}
  var $ = routerOptions.$ || $;

  if (!$) {
    throw new Error('JQuery not found.')
  }

  var $container = $(speclateOptions.container || '#container')
  var loadingClass = routerOptions.loadingClass || 'loading'

  page('*', function (context, next) {
    var routeName = context.pathname.slice(0, -5)
    if (routeName === '') {
      routeName = '/index'
    }
    var specPath = '/api/speclate' + routeName + '.json'
    $container.addClass(loadingClass)
    fetchSpec(specPath, function (err, pageSpec) {
      if (err) {
        $container.removeClass(loadingClass)
        return routerOptions.error(err, $container)
      }

      if (context.init) {
                    // we should check the spec version here
                    // reset options to before /after functions are not passed in.
        pageRender(pageSpec, {}, pageRenderCallback)
      } else {
        pageRender(pageSpec, routerOptions, pageRenderCallback)
      }
      $container.removeClass(loadingClass)
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

