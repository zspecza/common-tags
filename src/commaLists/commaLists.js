import TemplateTag from '../TemplateTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const commaLists = new TemplateTag(
  inlineArrayTransformer({ separator: ',' }),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default commaLists;
