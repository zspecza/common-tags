import createTag from '../createTag/index.js';
import stripIndent from '../stripIndent/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';
import splitStringTransformer from '../splitStringTransformer/index.js';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer/index.js';

const html = createTag(
  splitStringTransformer('\n'),
  removeNonPrintingValuesTransformer(),
  inlineArrayTransformer(),
  stripIndent,
);

export default html;
