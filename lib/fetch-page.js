
var fetchJson = require('speclate-fetch').json
var pageRender = require('./page-render')

module.exports = function (specPath, htmlEl, loadingClass, $container, routerOptions, context) {
  var active = true

  fetchJson(specPath, function (err, pageSpec) {
    // should carry on rendering without waiting for json to come back.
    if (!active) {
      return
    }
    if (err) {
      htmlEl.classList.remove(loadingClass)
      return routerOptions.error(err, $container)
    }
    htmlEl.setAttribute('data-speclate-page', pageSpec.page)

    var loaded = function () {
      htmlEl.classList.remove(loadingClass)
    }

    if (context.init) {
      // we should check the spec version here
      // reset options to before /after functions are not passed in.
      pageRender($container, pageSpec, {}, active, loaded)
    } else {
      pageRender($container, pageSpec, routerOptions, active, loaded)
    }
  })

  return {
    cancel: function (isActive) {
      active = false
    }
  }
}
