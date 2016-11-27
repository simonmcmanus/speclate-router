module.exports = {
  'Page should be added to the container': function (browser) {
    browser
      .url('http://localhost:5004/index.html')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#container', 'home')
      .url('http://localhost:5004/contact.html')
      .assert.containsText('#container', 'contact')
      .end()
  }
  // 'Container can be overridden': function (browser) {

  // }
}
