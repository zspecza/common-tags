import createTag from '../createTag';
import stripIndentTransformer from '../stripIndentTransformer';
import trimResultTransformer from '../trimResultTransformer';

const stripIndents = createTag(
  stripIndentTransformer('all'),
  trimResultTransformer(),
);

export default stripIndents;
