import urlParser from './urlParser';
import { ParsedURL } from '../interfaces/interfaces';

describe('PageURL', () => {
  let url: ParsedURL;
  const testURL: string = 'https://awesome.com/this/is?param1=tester&param2=stop#hashme';
  const testURLWithPort: string = 'https://localhost:8080/awesome/';

  it('should provide a `simple` and `origin` property', () => {
    url = urlParser(testURL);
    url.simple.should.equal('awesome.com/this/is');
    url.origin.should.equal('https://awesome.com');
  });

  it('should not provide a port on the `simple` property but should on `origin`', () => {
    url = urlParser(testURLWithPort);
    url.simple.should.not.contain('8080');
    url.origin.should.contain('8080');
  });
});
