'use strict'

var page = require('page')

var FetchPage = require('./fetch-page')
var requests = [];

module.exports = function (routerOptions, speclateOptions) {
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
    if (!context.init) {
      $container.empty()
    }

    var el = document.querySelector('html')
    el.classList.add(loadingClass)
    el.setAttribute('data-speclate-url', context.pathname)

  if (requests) {
    requests.forEach(function (req) {
      req.cancel()
    })
  }

    requests.push(new FetchPage(specPath, el, loadingClass, $container, routerOptions, context))
  })
  page()
}