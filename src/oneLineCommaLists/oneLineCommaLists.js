import createTag from '../createTag';
import inlineArrayTransformer from '../inlineArrayTransformer';
import trimResultTransformer from '../trimResultTransformer';
import replaceResultTransformer from '../replaceResultTransformer';

const oneLineCommaLists = createTag(
  inlineArrayTransformer({ separator: ',' }),
  replaceResultTransformer(/(?:\s+)/g, ' '),
  trimResultTransformer(),
);

export default oneLineCommaLists;
