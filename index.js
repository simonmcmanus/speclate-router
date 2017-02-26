'use strict'

var page = require('page')
var pageRender = require('./page-render')
var fetchJson = require('speclate-fetch').json

module.exports = function (routerOptions, speclateOptions, pageRenderCallback) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}
  var $container = $(speclateOptions.container || '#container')
  var loadingClass = routerOptions.loadingClass || 'loading'
  page('*', function (context, next) {
    var routeName = context.pathname.slice(0, -5)
    if (routeName === '') {
      routeName = '/index'
    }
    var specPath = '/api/speclate' + routeName + '.json'
    $container.addClass(loadingClass)
    fetchJson(specPath, function (err, pageSpec) {
      if (err) {
        $container.removeClass(loadingClass)
        return routerOptions.error(err, $container)
      }

      if (context.init) {
                    // we should check the spec version here
                    // reset options to before /after functions are not passed in.
        pageRender($container, pageSpec, {}, pageRenderCallback)
      } else {
        pageRender($container, pageSpec, routerOptions, pageRenderCallback)
      }
      $container.removeClass(loadingClass)
    })
  })
  page()
}
