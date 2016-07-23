import Page from './Page';
import { Observable  } from 'rxjs/Observable';
import { createHistory } from 'history';

describe('Page', () => {
  const { pathname, search } = window.location;
  const history = createHistory();
  let page: Page;
  let spy;

  beforeEach(() => {
    spy = sinon.spy();
    page = new Page();
  });

  afterEach(() => {
    spy.reset();
  });

  it('should instantiate with an observable property', () => {
    page.should.be.an.instanceof(Page);
    page.observable.should.exist;
  });

  describe('.getCurrentURL', () => {
    it('should return a ParsedURL object', () => {
      Page.getCurrentURL().should.have.property('simple');
    });
  });

  describe('.documentURL', () => {
    it('should return a string', () => {
      Page.documentURL().should.be.a('string');
    });

    it('should allow overriding', () => {
      const override: string = 'https://test.com/awesome'
      Page.documentURL(override).should.equal(override);
    });
  });

  describe('.getCurrentURL', () => {
    it('should return a ParsedURL object', () => {
      Page.getCurrentURL().should.have.property('simple');
    });
  });
});
