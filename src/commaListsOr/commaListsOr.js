import createTag from '../createTag';
import stripIndent from '../stripIndent';
import inlineArrayTransformer from '../inlineArrayTransformer';

const commaListsOr = createTag(
  inlineArrayTransformer({ separator: ',', conjunction: 'or' }),
  stripIndent,
);

export default commaListsOr;
