const replaceSubstitutionTransformer = (replaceWhat, replaceWith) => ({
  onSubstitution(substitution, resultSoFar) {
    if (replaceWhat == null || replaceWith == null) {
      throw new Error('replaceSubstitutionTransformer requires at least 2 arguments.')
    }

    // Do not touch if null or undefined
    if (substitution == null) {
      return substitution
    } else {
      return substitution.toString().replace(replaceWhat, replaceWith)
    }
  },
})

export default replaceSubstitutionTransformer
