import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const commaLists = createTag(
  inlineArrayTransformer({ separator: ',' }),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default commaLists;
