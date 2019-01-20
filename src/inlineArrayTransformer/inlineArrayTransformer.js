/**
 * Converts an array substitution to a string containing a list
 * @param {String} [opts.separator = '']   - The character that separates each item
 * @param {String} [opts.conjunction = ''] - Replace the last separator with this
 * @param {Boolean} [opts.serial = false]  - Include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                        - A transformer
 */
const inlineArrayTransformer = ({
  conjunction = '',
  separator = '',
  serial = false,
} = {}) => ({
  onSubstitution(substitution, resultSoFar) {
    // only operate on arrays
    if (!Array.isArray(substitution)) {
      return substitution;
    }

    const indentation = resultSoFar.match(/(\n?[^\S\n]+)$/);
    const fullSeparator = separator.concat(indentation ? indentation[1] : ' ');
    const fullConjunction = ''.concat(conjunction, ' ');
    const conjunctionIndex = conjunction ? substitution.length - 1 : -1;

    return substitution.reduce((result, part, index) => {
      const shouldUseConjunction = index === conjunctionIndex;
      return ''.concat(
        result,
        !shouldUseConjunction || serial ? fullSeparator : ' ',
        shouldUseConjunction ? fullConjunction : '',
        part,
      );
    });
  },
});

export default inlineArrayTransformer;
