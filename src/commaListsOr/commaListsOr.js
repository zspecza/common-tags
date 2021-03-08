import createTag from '../createTag/index.js';
import stripIndent from '../stripIndent/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';

const commaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  stripIndent,
);

export default commaListsOr;
