import TemplateTag from '../TemplateTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const commaListsOr = new TemplateTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default commaListsOr;
