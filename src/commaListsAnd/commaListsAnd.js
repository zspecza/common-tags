import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const commaListsAnd = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default commaListsAnd;
