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
    // for(var route in spec) {
    //   page(route, function(route) {
    //     var pageName = spec[route].page;
    //     var pageLayoutPath =  '/pages/' + pageName + '/' + pageName + '.html';

    //     console.log('layout url', pageLayoutPath);
    //     var pageJSPath =  '/pages/' + pageName + '/' + pageName + '.js';
    //     getPage(pageLayoutPath, function(error, file) {
    //             var html = speclate.doSizlate({
    //                 spec: spec[route].spec
    //             }, file, spec[route].spec);
    //             console.log('bot to err',spec[route].page,html);
    //             $('#container').html(html);
    //             //$('#perPageJs').attr('src', pageJSPath);
    //     });
    //   }.bind(null, route));