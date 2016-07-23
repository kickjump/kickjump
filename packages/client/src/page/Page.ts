import { Observable } from 'rxjs/observable';
import * as typeCheck from 'type-detect';

import { URLHistoryItem, ParsedURL } from '../interfaces/interfaces';
import urlParser from './urlParser';

/**
 * @class Page
 *
 * Keeps track of the page history and let's the application know
 * when a URL change event has occured.
 *
 * The class makes an eventlistener interface available via Emitter and also
 * an observable available via page.observable
 *
 * The observable is updated every time the page URL changes and makes this URL object
 * available to all stream listeners.
 *
 * A class that tracks page state as an observable
 */

export default class Page {

  public observable: Observable<URLHistoryItem>;

  /**
   * @constructor
   *
   * When first started up we need to obtain the current URL and set up
   * the page listeners.
   */

  constructor() {
    this.observable = this.createObservable();
  }


  /**
   * @static getCurrentURL
   *
   * Obtains the current URL as an object
   * @return {Object}  With properties
   *                        href|host|port|hash|hostname|pathname|protocol|
   *                        search|query|searchParams|queryParams
   */

  static getCurrentURL(): ParsedURL {
    return urlParser(document.URL);
  }


  /**
   * @static documentURL
   *
   * Get the current
   */
  static documentURL(override?: string): string {
    return override || document.URL;
  }


  /**
   * @private
   * @method setupStateListeners
   *
   * Every time the state (either push or replace state) is called within an
   * application we want our codebase to know.
   *
   * @param  {String} listenerType - Either push or replace
   * @param  {Function} cb         - Callback function for when state is used
   */

  private setupStateListeners(listenerType: string, cb: Function): void {
    const stateString: string = `${listenerType}State`;
    const stateEvent: string = `on${listenerType}state`;
    const originalStateFunction: Function = window.history[stateString] || (() => {});

    window.history[stateString] = function wrapper(state: Object, ...args): void | any {
      if (typeCheck(window.history[stateEvent]) === 'function') {
        window.history[stateEvent]({ state });
      }

      cb({ state, event: stateEvent });

      return originalStateFunction.apply(window.history, [state, ...args]);
    };
  }


  /**
   *	@method listenToPageChanges
   *
   * Listen to changes in:
   *  - Page URL through pushState
   *  - Page URL through replaceState
   *  - Hash changes through onhashchange
   *  - Back button via onpopstate
   *
   * @param  {Function} cb - Scoped function to call when page changes
   */

  listenToPageChanges(cb): void {
    this.setupStateListeners('push', cb);
    this.setupStateListeners('replace', cb);
    window.addEventListener('hashchange', cb, false);
    window.addEventListener('popstate', cb, false);
  }


  /**
   * @method stopListeningToPageChanges
   *
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */

  stopListeningToPageChanges(cb): void {
    window.removeEventListener('hashchange', cb, false);
    window.removeEventListener('popstate', cb, false);
  }

  /**
   * @method createObservable
   *
   * Will generate a stream of URL objects.
   * @return {Observable}
   */

  createObservable(): Observable<URLHistoryItem> {
    const callback = (observer): Function => {
      return (obj: any) => {
        const urlHistoryItem: URLHistoryItem = {
          timestamp: Date.now(),
          url: Page.getCurrentURL()
        };

        observer.next(urlHistoryItem);
      }
    }

    return Observable.create((observer) => {
      const cb = callback(observer);
      this.listenToPageChanges(cb);

      return () => {
        this.stopListeningToPageChanges(cb)
      }
    });
  }


}
