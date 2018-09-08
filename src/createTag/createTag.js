import { flat } from '../utils';

/**
 * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
 * template tag to our own template tag.
 * @param  {Function}        nextTag          - The received template tag
 * @param  {Array<String>}   template         - The template to process
 * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
 * @return {*}                                - The final processed value
 */
function getInterimTag(originalTag, extraTag) {
  return function tag(...args) {
    return originalTag(['', ''], extraTag(...args));
  };
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName              - The name of the hook
 * @param {String} initialString         - The input string
 * @param {...*} ...args                 - Additional arguments passed to the hook
 * @return {String}                      - The final results of applying each transformer
 */
function applyTransformersHook(transformers, hookName, initialString, ...args) {
  return transformers.reduce(
    (result, transformer) =>
      transformer[hookName] ? transformer[hookName](result, ...args) : result,
    initialString,
  );
}

/**
 * Consumes a pipeline of composable transformer plugins and produces a template tag.
 * @param  {...Object} [...rawTransformers] - An array or arguments list of transformers
 * @return {Function}                       - A template tag
 */
export default function createTag(...rawTransformers) {
  const transformers = flat(rawTransformers);

  return function tag(strings, ...expressions) {
    if (typeof strings === 'function') {
      // if the first argument passed is a function, assume it is a template tag and return
      // an intermediary tag that processes the template using the aforementioned tag, passing the
      // result to our tag
      return getInterimTag(tag, strings);
    }

    if (Array.isArray(strings)) {
      // if the first argument is an array, return a transformed end result of processing the template with our tag
      const processedTemplate = strings
        .map(string => applyTransformersHook(transformers, 'onString', string))
        .reduce((result, string, index) =>
          ''.concat(
            result,
            applyTransformersHook(
              transformers,
              'onSubstitution',
              expressions[index - 1],
              result,
            ),
            string,
          ),
        );

      return applyTransformersHook(
        transformers,
        'onEndResult',
        processedTemplate,
      );
    }

    // else just transform the argument
    return applyTransformersHook(transformers, 'onEndResult', strings);
  };
}
