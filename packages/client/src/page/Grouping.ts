import { PageConfig, URLConfig, ActivatorConfig,
         PageURLConfig } from '../interfaces/interfaces';
import History from './History';
import urlParser from './urlParser';


/**
 * @class PageGrouping
 *
 * A page grouping that takes in URL patterns and checks current page to
 * determine if they should be activated.
 *
 * Page groupings are used to determine the actions to fire as well.
 *
 * The key property to this class is the `active` stream. Can be subscribed
 * to in order to determine whether the page is currently active.
 *
 * ```
 * {
 * 	  name: 'Example',
 * 	 	id: 1,
 * 	 	urls: {
 * 	 		exclude: ["array of url objects"],
 * 	 		include: ["array of url objects"],
 * 	 	}
 *
 * }
 * ```
 *
 * Takes in urls and activators in order to produce an observable which
 * indicates when the page object is active
 *
 */

export default class PageGrouping implements PageConfig {

  private history: History;

  public id: number;
  public name: string;
  public exclude: PageURLConfig[];
  public include: PageURLConfig[];
  public activators: ActivatorConfig[];


  /**
   * @constructor
   */

  constructor (config: PageConfig, history) {
    this.initializePageConfig(config);
    this.history = history;
  }


  /**
   * @method
   *
   * Add properties to the class on instantiation.
   */

  initializePageConfig(config: PageConfig) {
    this.id = config.id;
    this.name = config.name;

    this.exclude = config.exclude;
    this.include = config.include;
    this.activators = config.activators;
  }


}
