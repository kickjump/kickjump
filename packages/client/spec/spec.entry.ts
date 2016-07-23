import 'babel-polyfill';
import 'ts-helpers';

import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

const testContext = (<{ context?: Function }>require)
    .context('../src', true, /.*\.ts$/);


/**
 * Provide the source files within context in order for code 
 * coverage to run properly.
 */

require('../src/');


/**
 * Load all test files
 */

testContext.keys().forEach(key => {
  // Only catch the test files (don't duplicate src file loading)
  if (/\.spec\.ts$/.test(key)) { 
    testContext(key);
  }
});

