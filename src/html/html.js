import TemplateTag from '../TemplateTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import splitStringTransformer from '../splitStringTransformer';
import removeNonPrintingValuesTransformer from '../removeNonPrintingValuesTransformer';

const html = new TemplateTag(
  splitStringTransformer('\n'),
  removeNonPrintingValuesTransformer(),
  inlineArrayTransformer(),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default html;
