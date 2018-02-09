import { Selector } from 'testcafe';

fixture`Getting Started`
  .page`http://localhost:5004`;


test('My first test', async t => {
  await t
    .click('.contact');
})

// 'full page loads with just /': function (browser) {
//   browser
//     .url('http://localhost:5004/')
//     .waitForElementVisible('body', 1000)
//     .assert.containsText('#container', 'home')
//     .url('http://localhost:5004/contact.html')
//     .assert.containsText('#container', 'contact')
//     .url('http://localhost:5004/')
//     .waitForElementVisible('body', 1000)
//     .end()
// },