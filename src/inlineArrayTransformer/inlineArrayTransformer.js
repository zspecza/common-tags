'use strict'

const defaults = {
  separator: ''
}

/**
 * Converts an array substitution to a string containing a list
 * @param  {String} opts.separator = '' - the character that separates each item
 * @param  {String} [opts.conjunction]  - replace the last separator with this
 * @return {Object}                     - a TemplateTag transformer
 */
const inlineArrayTransformer = (opts = defaults) => ({
  onSubstitution (substitution, resultSoFar) {
    // only operate on arrays
    if (Array.isArray(substitution)) {
      const separator = opts.separator
      const conjunction = opts.conjunction
      // join each item in the array into a string where each item is separated by separator
      // be sure to maintain indentation
      const indent = resultSoFar.match(/(\s+)$/)
      if (indent) {
        substitution = substitution.join(separator + indent[1])
      } else {
        substitution = substitution.join(separator + ' ')
      }
      // if conjunction is set, replace the last separator with conjunction
      if (conjunction) {
        const separatorIndex = substitution.lastIndexOf(separator)
        substitution = substitution
          .substr(0, separatorIndex) + ' ' + conjunction +
            substitution.substr(separatorIndex + 1)
      }
    }
    return substitution
  }
})

export default inlineArrayTransformer
