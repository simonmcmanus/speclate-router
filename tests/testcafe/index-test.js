
fixture`Getting Started`
  .page`http://localhost:5004`

test('My first test', async t => {
  await t
    .click('.contact')
})
