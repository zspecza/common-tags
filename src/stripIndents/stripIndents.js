import createTag from '../createTag/index.js';
import stripIndentTransformer from '../stripIndentTransformer/index.js';
import trimResultTransformer from '../trimResultTransformer/index.js';

const stripIndents = createTag(
  stripIndentTransformer('all'),
  trimResultTransformer('smart'),
);

export default stripIndents;
