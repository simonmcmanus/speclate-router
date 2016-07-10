'use strict';

var page = require('page');
var speclate = require('speclate');
var pageRender = require('./page-render')

module.exports = function(spec, pageRenderCallback) {
    for(var route in spec) {
      page(route, function(route, context) {
          if(!context.init) {
            pageRender(spec[route], pageRenderCallback);
          }
      }.bind(null, route));
    }
    page();
};