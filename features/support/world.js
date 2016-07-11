import { should } from 'chai';
const webdriverio = require('webdriverio');

should();

// const host = process.env.SELENIUM_HOST || '127.0.0.1';

const options = {
  // host,
  desiredCapabilities: {
    browserName: 'chrome',
  },
};

class World {
  constructor() {
    this.browser = webdriverio.remote(options);
  }
}

export default function () {
  this.World = World;
}
