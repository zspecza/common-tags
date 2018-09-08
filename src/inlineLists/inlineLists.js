import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';

const inlineLists = createTag(
  inlineArrayTransformer(),
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default inlineLists;
