import { prefixLines, stripLastNewLine } from '../utils/index.js';

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

    const { length } = substitution;
    const lastSeparatorIndex = conjunction && !serial ? length - 2 : length - 1;
    const indentation = resultSoFar.match(/(?:\n)([^\S\n]+)$/);

    if (conjunction && length > 1) {
      substitution[length - 1] = ''.concat(
        conjunction,
        ' ',
        substitution[length - 1],
      );
    }

    return substitution.reduce((result, part, index) => {
      const isFirstPart = index === 0;
      const strippedPart = stripLastNewLine(part);
      return ''.concat(
        result,
        isFirstPart ? '' : indentation ? '\n' : ' ',
        indentation
          ? prefixLines(indentation[1], strippedPart, isFirstPart)
          : strippedPart,
        index < lastSeparatorIndex ? separator : '',
      );
    }, '');
  },
});

export default inlineArrayTransformer;
