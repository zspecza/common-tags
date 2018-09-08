import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const commaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default commaListsOr;
