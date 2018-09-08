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

function getTagCallInfo(transformers) {
  return {
    transformers,
    context: transformers.map(
      transformer =>
        transformer.getInitialContext ? transformer.getInitialContext() : {},
    ),
  };
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName              - The name of the hook
 * @param {String} initialString         - The input string
 * @return {String}                      - The final results of applying each transformer
 */
function applyHook0({ transformers, context }, hookName, initialString) {
  return transformers.reduce(
    (result, transformer, index) =>
      transformer[hookName]
        ? transformer[hookName](result, context[index])
        : result,
    initialString,
  );
}

/**
 * Iterate through each transformer, calling the transformer's specified hook.
 * @param {Array<Function>} transformers - The transformer functions
 * @param {String} hookName              - The name of the hook
 * @param {String} initialString         - The input string
 * @param {*} arg1                       - An additional argument passed to the hook
 * @return {String}                      - The final results of applying each transformer
 */
function applyHook1({ transformers, context }, hookName, initialString, arg1) {
  return transformers.reduce(
    (result, transformer, index) =>
      transformer[hookName]
        ? transformer[hookName](result, arg1, context[index])
        : result,
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

    const tagCallInfo = getTagCallInfo(transformers);

    if (Array.isArray(strings)) {
      // if the first argument is an array, return a transformed end result of processing the template with our tag
      const processedTemplate = strings
        .map(string => applyHook0(tagCallInfo, 'onString', string))
        .reduce((result, string, index) =>
          ''.concat(
            result,
            applyHook1(
              tagCallInfo,
              'onSubstitution',
              expressions[index - 1],
              result,
            ),
            string,
          ),
        );

      return applyHook0(tagCallInfo, 'onEndResult', processedTemplate);
    }

    // else just transform the argument
    return applyHook0(tagCallInfo, 'onEndResult', strings);
  };
}
