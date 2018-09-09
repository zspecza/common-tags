import createTag from '../createTag';
import stripIndent from '../stripIndent';
import inlineArrayTransformer from '../inlineArrayTransformer';

const commaListsAnd = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'and' }),
  stripIndent,
);

export default commaListsAnd;
