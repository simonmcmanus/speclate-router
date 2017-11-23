'use strict'

var page = require('page')

var FetchPage = require('./fetch-page')
var SpecFromRoute = require('./lib/spec-from-route')
var requests = []

module.exports = function (routerOptions, speclateOptions) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}
  var $container = $(speclateOptions.container || '#container')
  var loadingClass = routerOptions.loadingClass || 'loading'
  var el = document.querySelector('html')
  el.classList.add(loadingClass)

  page('*', function (context, next) {
    el.classList.add(loadingClass)

    routerOptions.preFetch && routerOptions.preFetch($container)
    var specPath = SpecFromRoute(context.pathname)

    el.setAttribute('data-speclate-url', context.pathname)

    if (requests) {
      requests.forEach(function (req) {
        req.cancel()
      })
      requests = []
    }

    requests.push(new FetchPage(specPath, el, loadingClass, $container, routerOptions, context))
  })
  page()
}
