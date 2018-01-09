/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
const trimResultTransformer = (side = '') => ({
  onEndResult(endResult) {
    if (side === '') {
      return endResult.trim()
    }

    side = side.toLowerCase()

    if (side === 'start' || side === 'left') {
      return endResult.replace(/^\s*/, '')
    }

    if (side === 'end' || side === 'right') {
      return endResult.replace(/\s*$/, '')
    }

    throw new Error(`Side not supported: ${side}`)
  },
})

export default trimResultTransformer
