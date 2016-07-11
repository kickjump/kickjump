export default function () {
  this.When('I search Google for "$search"', async function (search) {
    await this.browser
        .url('http://www.google.co.uk/webhp?complete=0')
        .element('[name=q]')
        .keys(search)
        .keys('Enter');
  });

  this.Then('I should see some results', async function () {
    await this.browser.waitForExist('div.g', 100000)
      .elements('div.g')
      .then(elements => elements.value.should.have.length.above(0));
  });
}
