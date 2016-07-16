'use strict';

var page = require('page');
var speclate = require('speclate');
var pageRender = require('./page-render')

module.exports = function(spec, options, pageRenderCallback) {
    for(var route in spec) {
      page(route, function(route, context) {
          if(!context.init) {
            pageRender(spec[route], options, pageRenderCallback);
          }
      }.bind(null, route));
    }
    page();
};