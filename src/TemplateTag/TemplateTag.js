'use strict'

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
  constructor (...transformers) {
    // if first argument is an array, extrude it as a list of transformers
    if (transformers.length && Array.isArray(transformers[0])) {
      transformers = transformers[0]
    }

    // if any transformers are functions, this means they are not initiated - automatically initiate them
    this.transformers = transformers.map((transformer) => {
      return typeof transformer === 'function'
        ? transformer()
        : transformer
    })

    // return an ES2015 template tag
    return this.tag
  }

  /**
   * Applies all transformers to a template literal tagged with this method.
   * If a function is passed as the first argument, assumes the function is a template tag
   * and applies it to the template, returning a template tag.
   * @param  {(Function|Array<String>)} args[0] - Either a template tag or an array containing template strings separated by identifier
   * @param  {...*} [args[1]]                   - Optional list of substitution values.
   * @return {(String|Function)}                - Either an intermediary tag function or the results of processing the template.
   */
  tag = (...args) => {
    // if the first argument passed is a function, assume it is a template tag and return
    // an intermediary tag that processes the template using the aforementioned tag, passing the
    // result to our tag
    if (typeof args[0] === 'function') {
      return this.interimTag.bind(this, args.shift())
    }

    // else, return a transformed end result of processing the template with our tag
    return this.transformEndResult(
      args.shift().reduce(this.processSubstitutions.bind(this, args))
    )
  }

  /**
   * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
   * template tag to our own template tag.
   * @param  {Function}        nextTag          - the received template tag
   * @param  {Array<String>}   template         - the template to process
   * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
   * @return {*}                                - the final processed value
   */
  interimTag (previousTag, template, ...substitutions) {
    return this.tag`${previousTag(template, ...substitutions)}`
  }

  /**
   * Performs bulk processing on the tagged template, transforming each substitution and then
   * concatenating the resulting values into a string.
   * @param  {Array<*>} substitutions - an array of all remaining substitutions present in this template
   * @param  {String}   resultSoFar   - this iteration's result string so far
   * @param  {String}   remainingPart - the template chunk after the current substitution
   * @return {String}                 - the result of joining this iteration's processed substitution with the result
   */
  processSubstitutions (substitutions, resultSoFar, remainingPart) {
    const substitution = this.transformSubstitution(
      substitutions.shift(),
      resultSoFar
    )
    return resultSoFar + substitution + remainingPart
  }

  /**
   * When a substitution is encountered, iterates through each transformer and applies the transformer's
   * `onSubstitution` method to the substitution.
   * @param  {*}      substitution - The current substitution
   * @param  {String} resultSoFar  - The result up to and excluding this substitution.
   * @return {*}                   - The final result of applying all substitution transformations.
   */
  transformSubstitution (substitution, resultSoFar) {
    const cb = (res, transform) => transform.onSubstitution
      ? transform.onSubstitution(res, resultSoFar)
      : res
    return this.transformers.reduce(cb, substitution)
  }

  /**
   * Iterates through each transformer, applying the transformer's `onEndResult` method to the
   * template literal after all substitutions have finished processing.
   * @param  {String} endResult - The processed template, just before it is returned from the tag
   * @return {String}           - The final results of processing each transformer
   */
  transformEndResult (endResult) {
    const cb = (res, transform) => transform.onEndResult
      ? transform.onEndResult(res)
      : res
    return this.transformers.reduce(cb, endResult)
  }
}
