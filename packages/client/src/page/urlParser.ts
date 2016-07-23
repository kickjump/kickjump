const URL = require('url-parse'); // Currently doesn't support imports
import { ParsedURL } from '../interfaces/interfaces';
/**
 * @class
 *
 * Simply extend the URL parse module to provide an additional property for simple
 * urls and the URL origin.
 */

export default function urlParser(...args): ParsedURL {
  const [url, baseURL, parseQuery] = args;
  const parsedURL = new URL(url, baseURL, parseQuery);
  return {
    protocol: parsedURL.protocol,
    username: parsedURL.username,
    password: parsedURL.password,
    auth: parsedURL.auth,
    host: parsedURL.host,
    hostname: parsedURL.hostname,
    port: parsedURL.port,
    pathname: parsedURL.pathname,
    query: parsedURL.query,
    hash: parsedURL.hash,
    href: parsedURL.href,
    simple: `${parsedURL.hostname}${parsedURL.pathname}`,
    origin: `${parsedURL.protocol}//${parsedURL.host}`
  };
}
