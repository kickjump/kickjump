import PageHistory from './History';
import { Observable } from 'rxjs/Observable';
import { createHistory } from 'history';

describe('PageHistory', () => {
  const { pathname, search } = window.location;
  const history = createHistory();
  let pageHistory: PageHistory;
  let spy;

  beforeEach(() => {
    spy = sinon.spy();
    pageHistory = new PageHistory();
  });

  afterEach(() => {

  });

  describe('.getCurrentURL', () => {
    it('should return a ParsedURL object', () => {
      PageHistory.getCurrentURL().should.have.property('simple');
    });
  });

});
