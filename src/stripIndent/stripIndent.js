import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import trimResultTransformer from '../trimResultTransformer';

const stripIndent = createTag(
  stripIndentTransformer(),
  trimResultTransformer(),
);

export default stripIndent;
