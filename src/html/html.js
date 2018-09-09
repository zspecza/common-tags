import createTag from '../createTag';
import stripIndent from '../stripIndent';
import inlineArrayTransformer from '../inlineArrayTransformer';
import splitStringTransformer from '../splitStringTransformer';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer';

const html = createTag(
  splitStringTransformer('\n'),
  removeNonPrintingValuesTransformer(),
  inlineArrayTransformer(),
  stripIndent,
);

export default html;
