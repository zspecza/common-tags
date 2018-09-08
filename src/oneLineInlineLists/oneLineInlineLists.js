import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineInlineLists = createTag(
  inlineArrayTransformer(),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

export default oneLineInlineLists;
