'use strict'

var asyncParallel = require('async.parallel')
var sizlate = require('sizlate')
var getFile = require('speclate-fetch').readFile

var doSizlate = require('speclate/lib/page/do-sizlate')
var loadComponents = require('speclate/lib/page/load-components')

/**
 * used for client side render.
 */
module.exports = function ($container, page, options, active, callback) {
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
    if (!active) {
      return
    }
    if (err) {
      options.error && options.error(err, $container)
      return
    }

    if (options.before) {
      options.before(null, null, page)
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
    callback && callback(null, markup, page)
  })
}