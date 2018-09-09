import createTag from '../createTag';
import stripIndent from '../stripIndent';
import inlineArrayTransformer from '../inlineArrayTransformer';

const inlineLists = createTag(inlineArrayTransformer(), stripIndent);

export default inlineLists;
