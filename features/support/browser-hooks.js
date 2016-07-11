const settings = {
  timeout: 120 * 1000,
  tags: ['@browser'],
};

export default function () {
  this.Before(settings, async function beforeBrowserTest() {
    await this.browser.init();
  });

  this.After(settings, async function afterBrowserTest() {
    await this.browser.end();
  });
}
