'use strict'

/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'left' or 'right'
 * @return {Object}           - a TemplateTag transformer
 */
const trimResultTransformer = (side = '') => ({
  onEndResult (endResult) {
    // uppercase the first letter of side value
    if (side === 'left' || side === 'right') {
      side = side.charAt(0).toUpperCase() + side.slice(1)
    } else if (side !== '') {
      throw new Error(`Side not supported: ${side}`)
    }
    return endResult[`trim${side}`]()
  }
})

export default trimResultTransformer
