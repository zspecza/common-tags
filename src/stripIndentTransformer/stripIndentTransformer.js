const supportedTypes = ['initial', 'all'];

/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
const stripIndentTransformer = (type = 'initial') => {
  if (!supportedTypes.includes(type)) {
    throw new Error(`Type not supported: ${type}`);
  }

  return {
    onEndResult(endResult) {
      if (type === 'all') {
        // remove all indentation from each line
        return endResult.replace(/^[^\S\n]+/gm, '');
      }

      // remove the shortest leading indentation from each line
      const match = endResult.match(/^[^\S\n]*(?=\S)/gm);
      const indent = match && Math.min(...match.map(el => el.length));
      if (indent) {
        const regexp = new RegExp(`^.{${indent}}`, 'gm');
        return endResult.replace(regexp, '');
      }
      return endResult;
    },
  };
};

export default stripIndentTransformer;
