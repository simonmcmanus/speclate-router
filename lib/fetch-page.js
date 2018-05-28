
var fetchJson = require('speclate-fetch').json
var pageRender = require('./page-render')

module.exports = function (specPath, elements, selectors, loadingClass, routerOptions, context) {
  var active = true

  fetchJson(specPath, function (err, pageSpec) {
    // should carry on rendering without waiting for json to come back.
    if (!active) {
      return
    }
    if (err) {
      elements.$html.removeClass(loadingClass)
      return routerOptions.error(err, elements.$container)
    }
    elements.$html.attr('data-speclate-page', pageSpec.page)

    var loaded = function () {
      elements.$html.removeClass(loadingClass)
    }

    if (context.init) {
      // we should check the spec version here
      // reset options to before /after functions are not passed in.
      pageRender(elements, selectors, pageSpec, {}, active, loaded)
    } else {
      pageRender(elements, selectors, pageSpec, routerOptions, active, loaded)
    }
  })

  return {
    cancel: function (isActive) {
      active = false
    }
  }
}
