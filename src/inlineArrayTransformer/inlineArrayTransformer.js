/**
 * Converts an array substitution to a string containing a list
 * @param  {String} [opts.separator = ''] - the character that separates each item
 * @param  {String} [opts.conjunction = '']  - replace the last separator with this
 * @param  {Boolean} [opts.serial = false] - include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                     - a TemplateTag transformer
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

    // be sure to maintain indentation
    const indent = resultSoFar.match(/(\n?[^\S\n]+)$/);
    const fullSeparator = separator.concat(indent ? indent[1] : ' ');
    const fullConjunction = ''.concat(conjunction, ' ');
    const conjunctionIndex = conjunction ? substitution.length - 1 : -1;

    return substitution.reduce((result, part, index) =>
      ''.concat(
        result,
        index !== conjunctionIndex || serial ? fullSeparator : ' ',
        index === conjunctionIndex ? fullConjunction : '',
        part,
      ),
    );
  },
});

export default inlineArrayTransformer;
