/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
const replaceResultTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error('replaceResultTransformer requires exactly 2 arguments.');
  }

  return {
    onEndResult(endResult) {
      return endResult.replace(replaceWhat, replaceWith);
    },
  };
};

export default replaceResultTransformer;
