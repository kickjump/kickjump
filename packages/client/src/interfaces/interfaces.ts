import URL from 'url-parse';


/**
 * @type
 *
 * Activators have two types
 *  - *event*: activate based on events
 *  - *data*: activate based on data captured
 */

export type ActivatorType = 'event' | 'data';


/**
 * @type
 *
 * Indicates the type of URL change that has occured
 *  - _standard_: indicates that the page is from a fresh load.
 *  - _replacestate_: The new page replaced a previous page in history.
 *  - _pushstate_: Typical for single plage applications.
 *  - *hashchange*: The hash changed.
 */

export type URLHistoryItemType = 'hashchange' | 'pushstate' | 'replacestate' | 'standard';


/**
 * @interface
 *
 * A query object from the search parameters of a URL.
 */
export interface Query {
    [index: string]: string;
  }


/**
 * @type
 *
 * The PageURLConfig structure that is expected from the configuration object.
 */

export type PageURLConfig = URLConfig | string;


/**
 * @interface
 *
 * Items that are placed within the PageHistory Array comply to this interface
 */
export interface URLHistoryItem {
  timestamp: number; // Browser timestamp for when this was added
  url: ParsedURL;
  type?: URLHistoryItemType;
}


/**
 * @interface
 *
 * Configuration object for the activator which when present is used to determine
 * whether or not a page should be classed as active. It is reset again every time
 * the page changes.
 *
 * Both events and data can be used.
 */

export interface ActivatorConfig {
  type: ActivatorType;
}


/**
 * @interface
 *
 * Configuration for an individual URL on the page config.
 */

export interface URLConfig {
  url: string;
  query: Query;
  hash?: string;
  protocol?: string;
  port?: number;
}


/**
 * @interface
 *
 * Configuration for a page
 */

export interface PageConfig {
  id: number; // Unique identifier which is a simple integer
  name: string; // The name of the page
  exclude: PageURLConfig[];
  include: PageURLConfig[];
  activators: ActivatorConfig[];
}

/**
 * @interface
 *
 * Provides the configuration shape that is passed into the main initialization phase.
 */

export interface GlobalConfiguration {
  pages: PageConfig[];
}


export interface ParsedURL {
    simple: string; // simple: hostname and pathname
    origin: string; // origin: protocol and host.
    protocol: string; // protocol: Requested protocol without slashes (e.g. http:).
    username: string; // username: Username of basic authentication.
    password: string; // password: Password of basic authentication.
    auth: string; // auth: Authentication information portion (e.g. username:password).
    host: string; // host: Host name with port number.
    hostname: string; // hostname: Host name without port number.
    port: number; // port: Optional port number.
    pathname: string; // pathname: URL path.
    query: Query; // query: Parsed object containing query string, unless parsing is set to false.
    hash: string; // hash: The "fragment" portion of the URL including the pound-sign (#).
    href: string; // href: The full URL.
}
