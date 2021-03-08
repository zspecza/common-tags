import createTag from '../createTag/index.js';
import stripIndent from '../stripIndent/index.js';
import inlineArrayTransformer from '../inlineArrayTransformer/index.js';

const inlineLists = createTag(inlineArrayTransformer(), stripIndent);

export default inlineLists;
