'use strict'

var page = require('page')

var FetchPage = require('./fetch-page')
var requests = []

module.exports = function (routerOptions, speclateOptions) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}
  var $container = $(speclateOptions.container || '#container')
  var loadingClass = routerOptions.loadingClass || 'loading'
  var el = document.querySelector('html')


  page('*', function (context, next) {

    var render = el.getAttribute('data-speclate-render')

    // page is not being loaded from cache so just show the rendered page for speed.


    console.log(context.init, render, context.init && render !== 'layout-first')
    // Its the first page load and its deffo not from cache so just use the html already on the page.
    if (context.init && render === null) { // !== 'layout-first'
      console.log('very first page load')
      return
    }
    el.classList.add(loadingClass)

    console.log('not first page load')

    el.classList.add(loadingClass)

    routerOptions.preFetch && routerOptions.preFetch($container)

    var routeName = context.pathname.slice(0, -5)
    if (routeName === '') {
      routeName = '/index'
    }
    var specPath = '/api/speclate' + routeName + '.json'

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
