'use strict'

const stripIndentTransformer = (type = 'initial') => ({
  onEndResult (endResult) {
    if (type === 'initial') {
      const match = endResult.match(/^[ \t]*(?=\S)/gm)
      const indent = Math.min(...match.map(el => el.length))
      const regexp = new RegExp('^[ \\t]{' + indent + '}', 'gm')
      endResult = indent > 0 ? endResult.replace(regexp, '') : endResult
    } else if (type === 'all') {
      endResult = endResult.split('\n').map(line => line.trimLeft()).join('\n')
    } else {
      throw new Error(`Unknown type: ${type}`)
    }
    return endResult
  }
})

export default stripIndentTransformer
