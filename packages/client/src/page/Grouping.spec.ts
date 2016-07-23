import PageGrouping from './Grouping';
import PageHistory from './Page';
import { PageConfig } from '../interfaces/interfaces';

describe('PageGrouping Class', () => {
  let page: PageGrouping;
  let pageHistory: PageHistory;
  const testObject: PageConfig = {
    id: 1,
    name: 'TestGrouping',
    exclude: ['https://no.com'],
    include: ['https://yes.com'],
    activators: [{
      type: 'event'
    }]
  };

  beforeEach(() => {
    pageHistory = new PageHistory();
    page = new PageGrouping(testObject, pageHistory);
  });

  describe('#initializeConfig', () => {

    beforeEach(() => {
      pageHistory = new PageHistory();
      page = new PageGrouping(testObject, pageHistory);
    });

    it('should initialize with all the correct configuration', () => {
      page.id.should.equal(testObject.id);
      page.name.should.equal(testObject.name);
      page.exclude.should.deep.equal(testObject.exclude);
      page.include.should.deep.equal(testObject.include);
      page.activators.should.deep.equal(testObject.activators);
    });

    it('should be able to change the initializedConfig', () => {
      const overrideObject = {id: 2, name: 'NewGrouping'};
      const newObject: PageConfig = Object.assign({}, testObject, overrideObject);
      page.initializePageConfig(newObject);
      page.id.should.equal(overrideObject.id);
      page.name.should.equal(overrideObject.name);
    });
  });



});
