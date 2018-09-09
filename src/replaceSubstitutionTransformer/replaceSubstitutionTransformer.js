const replaceSubstitutionTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error(
      'replaceSubstitutionTransformer requires exactly 2 arguments.',
    );
  }

  return {
    onSubstitution(substitution) {
      // Do not touch if null or undefined
      if (substitution == null) {
        return substitution;
      } else {
        return String(substitution).replace(replaceWhat, replaceWith);
      }
    },
  };
};

export default replaceSubstitutionTransformer;
