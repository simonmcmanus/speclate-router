'use strict'

var async = require('async')
var sizlate = require('sizlate')
var getFile = require('./read-file')

var speclate = require('speclate')
console.log('spec', speclate);
var doSizlate = speclate.page.doSizlate
var loadComponents = speclate.components.load

/**
 * used for client side render.
 */
module.exports = function (page, options, callback) {
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
      return callback(err)
    }
    options.before();

    sizlate.render($('html'), {
      '#container': data.pageLayout
    })

    var markup = doSizlate(page, $('html'), data.components)
    options.after();
    callback(null, markup)
  })
}
