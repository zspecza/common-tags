import createTag from '../createTag/index.js';
import stripIndent from '../stripIndent/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';

const commaLists = createTag(
  inlineArrayTransformer({ separator: ',' }),
  stripIndent,
);

export default commaLists;
