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
      const match = endResult.match(/^[^\S\r\n]*(?=\S)/gm)
      const indent = match && Math.min(...match.map(el => el.length))
      if (indent) {
        const regexp = new RegExp(`^.{${indent}}`, 'gm')
        return endResult.replace(regexp, '')
      }
      return endResult
    }
    if (type === 'all') {
      // remove all indentation from each line
      return endResult.replace(/^[^\S\r\n]+/gm, '')
    }
    throw new Error(`Unknown type: ${type}`)
  }
})

export default stripIndentTransformer
