console.log('gi ther')
module.exports = {
  'Demo test Google' : function (browser) {
    console.log('gi ther')
    browser
      .url('http://localhost:5004/')
      .waitForElementVisible('body', 1000)
      // .setValue('input[type=text]', 'nightwatch')
      // .waitForElementVisible('button[name=btnG]', 1000)
      // .click('button[name=btnG]')
      // .pause(1000)
      // .assert.containsText('#main', 'Night Watch')
      .end();
  }
};