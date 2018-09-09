const replaceStringTransformer = (replaceWhat, replaceWith) => {
  if (replaceWhat == null || replaceWith == null) {
    throw new Error('replaceStringTransformer requires exactly 2 arguments.');
  }

  return {
    onString(str) {
      return str.replace(replaceWhat, replaceWith);
    },
  };
};

export default replaceStringTransformer;
