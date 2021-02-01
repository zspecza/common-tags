import createTag from '../createTag/index.js';
import stripIndent from '../stripIndent/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';

const commaListsAnd = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  stripIndent,
);

export default commaListsAnd;
