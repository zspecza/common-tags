import TemplateTag from '../TemplateTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const commaListsAnd = new TemplateTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default commaListsAnd;
