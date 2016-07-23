import { URLHistoryItem, ParsedURL } from '../interfaces/interfaces';
import urlParser from './urlParser';

/**
 * @class PageHistory
 *
 * Keeps track of the page history and let's the application know
 * when a URL change event has occured.
 *
 * The class makes an eventlistener interface available via Emitter and also
 * a stream available via pageHistory.stream
 *
 * The stream is updated every time the page URL changes and makes this URL object
 * available to all stream listeners.
 *
 * A class that stores page state.

 */

export default class PageHistory {



  /**
   * @constructor
   *
   * When first started up we need to obtain the current URL and set up
   * the page listeners.
   */

  constructor() {

  }

  static getCurrentURL(): ParsedURL {
    return urlParser(document.URL);
  }
}
