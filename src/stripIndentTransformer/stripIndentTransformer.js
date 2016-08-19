'use strict'

/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
const stripIndentTransformer = (type = 'initial') => ({
  onEndResult (endResult) {
    if (type === 'initial') {
      // remove the shortest leading indentation from each line
      const match = endResult.match(/^[ \t]*(?=\S)/gm)
      // return early if there's nothing to strip
      if (match === null) {
        return endResult
      }
      const indent = Math.min(...match.map(el => el.length))
      const regexp = new RegExp('^[ \\t]{' + indent + '}', 'gm')
      endResult = indent > 0 ? endResult.replace(regexp, '') : endResult
    } else if (type === 'all') {
      // remove all indentation from each line
      endResult = endResult.split('\n').map(line => line.trimLeft()).join('\n')
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
    return endResult
  }
})

export default stripIndentTransformer
