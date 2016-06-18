'use strict'

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
}
const sourceRegexp = '(?:' + Object.keys(escapeMap).join('|') + ')'
const testRegexp = RegExp(sourceRegexp)
const replaceRegexp = RegExp(sourceRegexp, 'g')

/**
 * TemplateTag transformer that does HTML escaping on string substitution
 * results (everything in `${ ... }`)
 * @return {Object} - a TemplateTag transformer
 */
const escapeHtmlTransformer = () => ({
  onSubstitution (substitution, resultSoFar) {
    // Don't touch strings that do not have characters to be escaped
    if (testRegexp.test(substitution)) {
      return substitution.replace(replaceRegexp, match => escapeMap[match])
    } else {
      return substitution
    }
  }
})

export default escapeHtmlTransformer
