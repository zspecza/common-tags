const replaceStringTransformer = (replaceWhat, replaceWith) => ({
  onString(str) {
    if (replaceWhat == null || replaceWith == null) {
      throw new Error('replaceStringTransformer requires at least 2 arguments.')
    }

    return str.replace(replaceWhat, replaceWith)
  },
})

export default replaceStringTransformer
