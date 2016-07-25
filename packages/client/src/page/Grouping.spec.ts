import PageGrouping from './Grouping';
import Page from './Page';
import { PageConfig } from '../interfaces/interfaces';

describe('PageGrouping', () => {
  let pageGrouping: PageGrouping;
  let page: Page;
  let stub: Sinon.SinonStub;

  const testObject: PageConfig = {
    id: 1,
    name: 'TestGrouping',
    exclude: ['https://no.com'],
    include: ['https://yes.com'],
    activators: [{
      type: 'event'
    }]
  };

  describe('#initializeConfig', () => {
    beforeEach(() => {
      page = new Page();
      pageGrouping = new PageGrouping(testObject, page);
    });

    it('should initialize with all the correct configuration', () => {
      pageGrouping.id.should.equal(testObject.id);
      pageGrouping.name.should.equal(testObject.name);
      pageGrouping.exclude.should.deep.equal(testObject.exclude);
      pageGrouping.include.should.deep.equal(testObject.include);
      pageGrouping.activators.should.deep.equal(testObject.activators);
    });

    it('should be able to change the initializedConfig', () => {
      const overrideObject = {id: 2, name: 'NewGrouping'};
      const newObject: PageConfig = Object.assign({}, testObject, overrideObject);
      pageGrouping.initializePageConfig(newObject);
      pageGrouping.id.should.equal(overrideObject.id);
      pageGrouping.name.should.equal(overrideObject.name);
    });
  });

  describe('checkURL', () => {
    const stubbedURL = 'http://stubbedURL.com/match/me';
    const splatPattern = 'stubbedURL.com/*/me';
    const namedPattern = 'stubbedURL.com/:name/me';
    const failingPattern = 'stubbedURL.com/awesome/fail';

    beforeEach(() => {
      stub = sinon.stub(Page, 'documentURL');
      stub.returns(stubbedURL);
      page = new Page();
      pageGrouping = new PageGrouping(testObject, page);
    });

    afterEach(() => {
      stub.restore();
    });

    it('should return an object when matching splat params', () => {
      const params = pageGrouping.checkURL(splatPattern) as any;
      params.should.have.property.splat;
    });

    it('should return an object when matching params', () => {
      const params = pageGrouping.checkURL(namedPattern) as any;
      params.name.should.equal('match');
    });

    it('should return an object when matching params', () => {
      const params = pageGrouping.checkURL(failingPattern) as any;
      expect(params).to.be.null;
    });
  });
});
