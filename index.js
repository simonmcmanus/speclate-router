'use strict'

var page = require('page')
var pageRender = require('./page-render')
var fetchJson = require('speclate-fetch').json
var latestRequestUrl;

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
    $container.empty()

    var el = document.querySelector('html')
    el.classList.add(loadingClass)
    el.setAttribute('data-speclate-url', context.pathname)


    fetchJson(specPath, function (err, pageSpec, url) {

      var lastLoadedUrl = el.getAttribute('data-speclate-url')
      if (lastLoadedUrl !== url ) {
        return //  not the latest request so cancel it.
      }


      if (err) {
        $container.removeClass(loadingClass)
        el.classList.remove(loadingClass)
        return routerOptions.error(err, $container)
      }
      el.setAttribute('data-speclate-page', pageSpec.page)

      var loaded = function () {
        el.classList.remove(loadingClass)
      }

      if (context.init) {
        // we should check the spec version here
        // reset options to before /after functions are not passed in.
        pageRender($container, pageSpec, {}, loaded)
      } else {
        pageRender($container, pageSpec, routerOptions, loaded)
      }
    })
  })
  page()
}