import createTag from '../createTag/index.js';
import stripIndentTransformer from '../stripIndentTransformer/index.js';
import trimResultTransformer from '../trimResultTransformer/index.js';

const stripIndent = createTag(
  stripIndentTransformer(),
  trimResultTransformer('smart'),
);

export default stripIndent;
