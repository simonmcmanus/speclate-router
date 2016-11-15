module.exports = {
  'Page should be added to the container' : function (browser) {
    browser
      .url('http://localhost:5004/')
      .waitForElementVisible('#container', 1000)
      .assert.containsText('#container', 'home')
      .click('nav a[href="contact.html"]')
      .assert.containsText('#container', 'contact')
      .end();
  },
  // 'Container can be overridden': function (browser) {

  // }
};