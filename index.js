'use strict';

var page = require('page');
var speclate = require('speclate');
var superagent = require('superagent');



var getPage = function(file, callback) {

    if('serviceWorker' in navigator) {
      fetch(file).then(function(file) {
          callback(null, Promise.resolve(file.text()));

      }).catch(function(err) {
        console.log('err', err);
      });
    }else {
      superagent.get( window.location.origin +  file )
      .end(function(err, res) {
          if(res.ok) {
              callback(null, res.text); // passing null error param to keep same interface as fs.readfile.
          }else {
              callback(err || res.body);
          }
      });
    }

};


module.exports = function(spec) {

    for(var route in spec) {
      page(route, function(route) {
        var noHtml = route.slice(0, -5);
        var apiPath = '/api/speclate' + noHtml + '.json'
        console.log('har')

        // this should call get page from speclate, just need to figure out how to get it working.
        getPage(apiPath, function(error, spec) {


            console.log('apipath:', apiPath, spec);
                var html = speclate.doSizlate({
                    spec: spec[route].spec
                }, $('#container'), spec[route].spec);

                //$('#perPageJs').attr('src', pageJSPath);
        });
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