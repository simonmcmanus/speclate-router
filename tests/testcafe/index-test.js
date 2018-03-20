
import { Selector } from 'testcafe'

fixture`Getting Started`
  .page`http://localhost:5004`

test('My first test', async t => {
  await t
    .click('.contact')


  const container = Selector('#container');

  //await  container.contains('Home page')


  await t.expect(container).eql('Home page')
})
