import { flat } from '../utils';

/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */
export default class TemplateTag {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  constructor(...transformers) {
    this.transformers = flat(transformers);

    // return an ES2015 template tag
    return this.tag;
  }

  /**
   * Applies all transformers to a template literal tagged with this method.
   * If a function is passed as the first argument, assumes the function is a template tag
   * and applies it to the template, returning a template tag.
   * @param  {(Function|String|Array<String>)} strings        - Either a template tag or an array containing template strings separated by identifier
   * @param  {...*}                            ...expressions - Optional list of substitution values.
   * @return {(String|Function)}                              - Either an intermediary tag function or the results of processing the template.
   */
  tag = (strings, ...expressions) => {
    if (typeof strings === 'function') {
      // if the first argument passed is a function, assume it is a template tag and return
      // an intermediary tag that processes the template using the aforementioned tag, passing the
      // result to our tag
      return this.interimTag.bind(this, strings);
    }

    if (typeof strings === 'string') {
      // if the first argument passed is a string, just transform it
      return this.transformEndResult(strings);
    }

    // else, return a transformed end result of processing the template with our tag
    strings = strings.map(this.transformString.bind(this));
    return this.transformEndResult(
      strings.reduce(this.processSubstitutions.bind(this, expressions)),
    );
  };

  /**
   * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
   * template tag to our own template tag.
   * @param  {Function}        nextTag          - the received template tag
   * @param  {Array<String>}   template         - the template to process
   * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
   * @return {*}                                - the final processed value
   */
  interimTag(previousTag, template, ...substitutions) {
    return this.tag`${previousTag(template, ...substitutions)}`;
  }

  /**
   * Performs bulk processing on the tagged template, transforming each substitution and then
   * concatenating the resulting values into a string.
   * @param  {Array<*>} substitutions - an array of all remaining substitutions present in this template
   * @param  {String}   resultSoFar   - this iteration's result string so far
   * @param  {String}   remainingPart - the template chunk after the current substitution
   * @return {String}                 - the result of joining this iteration's processed substitution with the result
   */
  processSubstitutions(substitutions, resultSoFar, remainingPart) {
    const substitution = this.transformSubstitution(
      substitutions.shift(),
      resultSoFar,
    );
    return ''.concat(resultSoFar, substitution, remainingPart);
  }

  /**
   * Iterate through each transformer, applying the transformer's `onString` method to the template
   * strings before all substitutions are processed.
   * @param {String}  str - The input string
   * @return {String}     - The final results of processing each transformer
   */
  transformString(str) {
    const cb = (res, transform) =>
      transform.onString ? transform.onString(res) : res;
    return this.transformers.reduce(cb, str);
  }

  /**
   * When a substitution is encountered, iterates through each transformer and applies the transformer's
   * `onSubstitution` method to the substitution.
   * @param  {*}      substitution - The current substitution
   * @param  {String} resultSoFar  - The result up to and excluding this substitution.
   * @return {*}                   - The final result of applying all substitution transformations.
   */
  transformSubstitution(substitution, resultSoFar) {
    const cb = (res, transform) =>
      transform.onSubstitution
        ? transform.onSubstitution(res, resultSoFar)
        : res;
    return this.transformers.reduce(cb, substitution);
  }

  /**
   * Iterates through each transformer, applying the transformer's `onEndResult` method to the
   * template literal after all substitutions have finished processing.
   * @param  {String} endResult - The processed template, just before it is returned from the tag
   * @return {String}           - The final results of processing each transformer
   */
  transformEndResult(endResult) {
    const cb = (res, transform) =>
      transform.onEndResult ? transform.onEndResult(res) : res;
    return this.transformers.reduce(cb, endResult);
  }
}
