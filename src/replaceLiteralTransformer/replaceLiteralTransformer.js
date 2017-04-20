'use strict'

const replaceLiteralTransformer = (replaceWhat, replaceWith) => ({
  onLiteral (literal) {
    if (replaceWhat == null || replaceWith == null) {
      throw new Error('replaceLiteralTransformer requires at least 2 arguments.')
    }

    return literal.replace(replaceWhat, replaceWith)
  }
})

export default replaceLiteralTransformer
