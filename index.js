'use strict'

var page = require('page')

var FetchPage = require('./lib/fetch-page')
var SpecFromRoute = require('./lib/spec-from-route')
var requests = []

module.exports = function (routerOptions, speclateOptions) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}
  var loadingClass = routerOptions.loadingClass || 'loading'
  const selectors = {
    html: 'html',
    container: speclateOptions.container || '#container'
  }

  const elements = {
    $html: $(selectors.html),
    $container: $(selectors.container)
  }
  elements.$html.addClass(loadingClass)

  page('*', function (context, next) {
    elements.$html.addClass(loadingClass)

    routerOptions.preFetch && routerOptions.preFetch(elements.$container)
    var specPath = SpecFromRoute(context.pathname)

    elements.$html.attr('data-speclate-url', context.pathname)

    if (requests) {
      requests.forEach(function (req) {
        req.cancel()
      })
      requests = []
    }

    // check the spec here to see what strategy it should be using.

    requests.push(new FetchPage(specPath, elements, selectors, loadingClass, routerOptions, context))
  })
  page()
}
