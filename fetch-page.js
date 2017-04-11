
var fetchJson = require('speclate-fetch').json


//module.exports = function (specPath, htmlEl, loadingClass, $container, routerOptions) {
module.exports = function (name) {

  var active = true

  var timeout = (name === '/links.html') ? 5000 : 2000

//console.log('active ', active, name);
  setTimeout(function() {
    console.log('active ', active, name);
  }, timeout)

  return {
    cancel: function (isActive) {

      active = false
    }
  }

};






  // fetchJson(specPath, function (err, pageSpec, url) {

  //   if (!active) {
  //     return
  //   }
  //   if (err) {
  //     $container.removeClass(loadingClass)
  //     htmlEl.classList.remove(loadingClass)
  //     return routerOptions.error(err, $container)
  //   }
  //   htmlEl.setAttribute('data-speclate-page', pageSpec.page)

  //   var loaded = function () {
  //     htmlEl.classList.remove(loadingClass)
  //   }

  //   if (context.init) {
  //     // we should check the spec version here
  //     // reset options to before /after functions are not passed in.
  //     pageRender($container, pageSpec, {}, loaded)
  //   } else {
  //     pageRender($container, pageSpec, routerOptions, loaded)
  //   }
  // })