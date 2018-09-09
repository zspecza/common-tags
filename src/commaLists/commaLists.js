import createTag from '../createTag';
import stripIndent from '../stripIndent';
import inlineArrayTransformer from '../inlineArrayTransformer';

const commaLists = createTag(
  inlineArrayTransformer({ separator: ',' }),
  stripIndent,
);

export default commaLists;
