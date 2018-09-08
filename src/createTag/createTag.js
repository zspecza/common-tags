import { flat } from '../utils';

/**
 * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
 * template tag to our own template tag.
 * @param  {Function}        nextTag          - the received template tag
 * @param  {Array<String>}   template         - the template to process
 * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
 * @return {*}                                - the final processed value
 */
function getInterimTag(originalTag, extraTag) {
  return function tag(...args) {
    return originalTag(['', ''], extraTag(...args));
  };
}

/**
 * Iterate through each transformer, applying the transformer's `onString` method to the template
 * strings before all substitutions are processed.
 * @param {String}  str - The input string
 * @return {String}     - The final results of processing each transformer
 */
function transformString(transformers, str) {
  return transformers.reduce(
    (result, transform) =>
      transform.onString ? transform.onString(result) : result,
    str,
  );
}

/**
 * When a substitution is encountered, iterates through each transformer and applies the transformer's
 * `onSubstitution` method to the substitution.
 * @param  {*}      substitution - The current substitution
 * @param  {String} resultSoFar  - The result up to and excluding this substitution.
 * @return {*}                   - The final result of applying all substitution transformations.
 */
function transformSubstitution(transformers, substitution, resultSoFar) {
  return transformers.reduce(
    (result, transform) =>
      transform.onSubstitution
        ? transform.onSubstitution(result, resultSoFar)
        : result,
    substitution,
  );
}

/**
 * Iterates through each transformer, applying the transformer's `onEndResult` method to the
 * template literal after all substitutions have finished processing.
 * @param  {String} endResult - The processed template, just before it is returned from the tag
 * @return {String}           - The final results of processing each transformer
 */
function transformEndResult(transformers, endResult) {
  return transformers.reduce(
    (result, transform) =>
      transform.onEndResult ? transform.onEndResult(result) : result,
    endResult,
  );
}

/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...transformers] - an array or arguments list of transformers
 * @return {Function}                    - a template tag
 */
export default function createTag(...transformers) {
  transformers = flat(transformers);

  return function tag(strings, ...expressions) {
    if (typeof strings === 'function') {
      // if the first argument passed is a function, assume it is a template tag and return
      // an intermediary tag that processes the template using the aforementioned tag, passing the
      // result to our tag
      return getInterimTag(tag, strings);
    }

    if (typeof strings === 'string') {
      // if the first argument passed is a string, just transform it
      return transformEndResult(transformers, strings);
    }

    // else, return a transformed end result of processing the template with our tag
    strings = strings.map(string => transformString(transformers, string));
    return transformEndResult(
      transformers,
      strings.reduce((result, string) => {
        const substitution = transformSubstitution(
          transformers,
          expressions.shift(),
          result,
        );
        return ''.concat(result, substitution, string);
      }),
    );
  };
}
