
import { Selector } from 'testcafe'

fixture`Getting Started`
  .page`http://localhost:5004`

test('My first test', async t => {
  await t
    .click('.contact')
    .expect(Selector('#container')).contains('Home page');
})
