'use strict'

/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
const replaceResultTransformer = (replaceWhat, replaceWith) => ({
  onEndResult (endResult) {
    if (replaceWhat == null || replaceWith == null) {
      throw new Error('replaceResultTransformer requires at least 2 arguments.')
    }
    return endResult.replace(replaceWhat, replaceWith)
  }
})

export default replaceResultTransformer
