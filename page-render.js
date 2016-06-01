'use strict'

var async = require('async')
var sizlate = require('sizlate')
var getFile = require('./read-file')

var speclate = require('speclate')
var doSizlate = speclate.site.doSizlate
var loadComponents = speclate.components.load

/**
 * used for client side render.
 */
module.exports = function (page, callback) {
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
    $('nav a.active').removeClass('active')

    sizlate.render($('html'), {
      '#container': data.pageLayout
    })

    // components have not been renedered here, we just throwing in json
    console.log('--.>', data.components);
    var markup = doSizlate(page, $('html'), data.components)
    $('body').scrollTop($('#container'))
    callback(null, markup)
  })
}
