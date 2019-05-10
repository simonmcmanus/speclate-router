'use strict'

var FetchPage = require('./lib/fetch-page')
var SpecFromRoute = require('./lib/spec-from-route')
var requests = []

var onClick = function (selectors, elements, routerOptions, speclateOptions) {
  return function (e) {
    const link = e.currentTarget
    const newLocation = link.getAttribute('href')
    const isLocal = link && newLocation.slice(0, 4) !== 'http'
    if (isLocal) {
      e.preventDefault()
      var state = {}
      var stateName = ''
      window.history.pushState(state, stateName, newLocation)
      pageChange(selectors, newLocation, elements, routerOptions, speclateOptions)
    }
  }
}

var pageChange = function (selectors, newLocation, elements, routerOptions, speclateOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading'
  elements.html.classList.add(loadingClass)
  routerOptions.preFetch && routerOptions.preFetch(elements.container)
  var specPath = SpecFromRoute(newLocation)

  elements.html.setAttribute('data-speclate-url', newLocation)
  if (requests) {
    requests.forEach(function (req) {
      req.cancel()
    })
    requests = []
  }

  // check the spec here to see what strategy it should be using.
  requests.push(new FetchPage(specPath, elements, selectors, loadingClass, routerOptions))
}

var setupLinks = function (routerOptions, speclateOptions) {
  const selectors = {
    html: 'html',
    container: speclateOptions.container || '#container'
  }

  var elements = {
    html: document.querySelector(selectors.html),
    container: document.querySelector(selectors.container)
  }

  // TODO - this could be loaded from the spec, ideally bound as the domNode is created.
  var links = document.getElementsByTagName('a')
  for (var i = 0; i < links.length; i++) {
    // TODO:  could check here if the link is listed in the spec
    links[i].addEventListener('click', onClick(selectors, elements, routerOptions, speclateOptions), { capture: false })
  }
}

module.exports = function (routerOptions, speclateOptions) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}

  document.addEventListener('DOMContentLoaded', setupLinks(routerOptions, speclateOptions), false)
  // TODO: add mechanism to remove listener
}
