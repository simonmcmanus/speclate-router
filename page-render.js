'use strict'

var asyncParallel = require('async.parallel')
var sizlate = require('sizlate')
var getFile = require('speclate-fetch').readFile

var doSizlate = require('speclate/lib/page/do-sizlate')
var loadComponents = require('speclate/lib/page/load-components')

/**
 * used for client side render.
 */
module.exports = function (page, options) {
  asyncParallel({
    pageLayout: function (next) {
      var pageLayoutPath = '/pages/' + page.page + '/' + page.page + '.html'
      getFile(pageLayoutPath, {encoding: 'utf-8'}, next)
    },
    components: function (next) {
      if (page.spec) {
        loadComponents(page.spec, next)
      } else {
        next()
      }
    }
  }, function (err, data) {
    if (err) {
      options.error && options.error(err)
      return
    }

    if (options.before) {
      options.before(null, markup, page)
    }

    sizlate.render($('html'), {
      '#container': {
        innerHTML: data.pageLayout
      }
    })

    var markup = doSizlate(page, $('html'), data.components)

    if (options.after) {
      options.after(null, markup, page)
    }
  })
}
