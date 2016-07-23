declare module 'url-matcher' {
  interface PatternMatcher {
    remainingPathName: string;
    paramNames: string[];
    paramValues: string[];
  }

  interface GetRoute {
    tokens: any[];
    regexpSource: RegExp;
    params: ParamRules;
    paramNames: string[];
  }

  interface MatcherRoute {
    pattern: string;
    rules: any;
  }

  interface Params {
    [paramName: string]: string | string[];
  }

  interface ParamRules {
    [paramName: string]: any | any[];
  }

  type GetParams = Params | void;
  type Route = MatcherRoute | string;

  export function matchPattern(route: Route, pathname: string): PatternMatcher;
  export function getRoute(route: Route): GetRoute;
  export function getParams(route: Route, pathname: string): GetParams;
  export function formatPattern(route: Route, params: Params): string;
}


declare module 'url-parse' {
  interface Query {
    [index: string]: string;
  }

  interface QueryParser {
    (query: string): any;
  }


  interface ParsedURL {
    (url: string, baseURL ? : string, parseQuery ? : boolean | QueryParser): ParsedURL;
    new(url: string, baseURL ? : string, parseQuery ? : boolean | QueryParser): ParsedURL;
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

    toString(): string;
    set(key: string, value: string | Object | number);
  }

  const URL: ParsedURL;

  export default URL;
}
