'use strict'

var async = require('async')
var sizlate = require('sizlate')
var getFile = require('./read-file')

var speclate = require('speclate')
var doSizlate = speclate.page.doSizlate
var loadComponents = speclate.components.load

/**
 * used for client side render.
 */
module.exports = function (page, options) {
  async.parallel({
    pageLayout: function (next) {
      var pageLayoutPath = '/pages/' + page.page + '/' + page.page + '.html'
      getFile(pageLayoutPath, next)
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
      options.error && options.error(err);
      return;
    }
    options.before && options.before();

    sizlate.render($('html'), {
      '#container': data.pageLayout
    })

    var markup = doSizlate(page, $('html'), data.components)
    options.after && options.after(null, markup);
  })
}
